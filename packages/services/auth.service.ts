import {
  PrismaClient,
  User,
  UserType,
} from "my-website.data/generates/index.js";
import { AuthEvents } from "./events/auth.events.js";
import {
  IJwtPayload,
  JWTConfirmEmailPayload,
  JWTResetPasswordPayload,
} from "my-website.common/types";
import { RegisterDto } from "my-website.common/dtos/auth/register.dto.js";
import { LoginDto } from "my-website.common/dtos/auth/login.dto.js";
import { ForgotPasswordOtpDto } from "my-website.common/dtos/auth/forgotPasswordOtp.dto.js";
import { ConfirmEmailDto } from "my-website.common/dtos/auth/confirmEmail.dto.js";
import { ResetPasswordDto } from "my-website.common/dtos/auth/resetPassword.dto.js";
import { ResendVerificationEmailDto } from "my-website.common/dtos/auth/resendVerificationEmail.dto.js";
import { GoogleLoginDto } from "my-website.common/dtos/auth/googleLoginSchema.js";
import { MathUtils } from "my-website.common/utils/MathUtils.js";
import {
  UnAuthorizedException,
  BadRequestException,
} from "my-website.common/express/exceptions/index.js";
import { JwtUtils } from "my-website.common/utils/JwtUtils.js";
import { HashUtils } from "my-website.common/utils/HashUtils.js";
import { OAuth2Client } from "google-auth-library";

export class AuthService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly authEvents: AuthEvents,
    private readonly jwtUtils: JwtUtils,
    private readonly hashUtils: HashUtils,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findFirst({
      where: { email: dto.email },
      include: {
        profile: true,
      },
    });

    if (!user) {
      throw new UnAuthorizedException("Invalid Username or Password!");
    }

    if (!user.isActive || !user.emailVerified) {
      throw new UnAuthorizedException(
        "Account inactive or email verification pending!",
      );
    }

    const isPasswordValid = this.hashUtils.compare(dto.password, user.password);

    if (!isPasswordValid) {
      throw new UnAuthorizedException("Invalid Username or Password!");
    }

    const token = this.jwtUtils.signAuthToken({
      tokenType: "auth",
      id: user.id,
      userType: user.userType,
      email: user.email,
    });

    return { user, token };
  }

  async register(dto: RegisterDto): Promise<User> {
    const { password, ...rest } = dto;

    const existUser = await this.prisma.user.findFirst({
      where: { email: rest.email },
    });

    if (existUser) {
      throw new BadRequestException("User with email id already Exist!");
    }

    const user = await this.prisma.user.create({
      data: {
        ...rest,
        password: this.hashUtils.hash(password),
        userName: (
          rest.fullName + MathUtils.getRandom6number()
        ).toLocaleLowerCase(),
        emailVerified: false,
        userType: UserType.User,
        isActive: true,
        profile: {
          create: {},
        },
      },
    });

    if (user) {
      this.authEvents.emit("userSignedup", user);
    }

    return user;
  }

  async confirmEmail(dto: ConfirmEmailDto) {
    const payload = this.jwtUtils.varifyToken(
      dto.jwt,
    ) as JWTConfirmEmailPayload;

    if (payload.tokenType !== "confirm-email") {
      throw new BadRequestException("Invalid Token");
    }

    const user = await this.prisma.user.update({
      where: { email: payload.email },
      data: {
        emailVerified: true,
      },
    });

    const token = this.jwtUtils.sign({
      tokenType: "auth",
      id: user.id,
      userType: user.userType,
      email: user.email,
    } as IJwtPayload);

    return { user, token };
  }

  async resendVerificiationEmail(dto: ResendVerificationEmailDto) {
    const user = await this.prisma.user.findFirstOrThrow({
      where: { email: dto.email },
    });
    if (user.emailVerified) {
      throw new BadRequestException("Email Already verified");
    }

    this.authEvents.emit("userSignedup", user);
  }

  async forgotPasswordOtp(dto: ForgotPasswordOtpDto) {
    const user = await this.prisma.user.findFirstOrThrow({
      where: {
        email: dto.email,
      },
    });

    this.authEvents.emit("userForgotPassword", user);
  }

  async resetPassword(dto: ResetPasswordDto): Promise<User> {
    const payload = this.jwtUtils.varifyToken(
      dto.jwt,
    ) as JWTResetPasswordPayload;

    if (payload.tokenType !== "reset-password" && !payload?.id) {
      throw new BadRequestException("Invalid Token");
    }

    const user = await this.prisma.user.update({
      where: {
        id: payload.id,
      },
      data: {
        password: this.hashUtils.hash(dto.password),
      },
    });

    return user;
  }

  async googleAuth(dto: GoogleLoginDto) {
    const client = new OAuth2Client("YOUR_GOOGLE_CLIENT_ID");

    const ticket = await client.verifyIdToken({
      idToken: dto.credential,
    });

    const payload = ticket.getPayload()!;
    const user = await this.prisma.user.findFirst({
      where: {
        email: payload.email,
      },
      include: {
        profile: true,
      },
    });

    if (user && user.isActive) {
      await this.prisma.user.update({
        where: { email: payload.email },
        data: {
          emailVerified: true,
          profile: !user.profile?.avatar
            ? {
                update: {
                  avatar: payload.picture,
                },
              }
            : {},
        },
      });

      const token = this.jwtUtils.signAuthToken({
        tokenType: "auth",
        id: user.id,
        userType: user.userType,
        email: user.email,
      });

      return { user, token };
    } else {
      const createdUser = await this.prisma.user.create({
        data: {
          fullName: payload.name!,
          userName: (payload.name || "") + MathUtils.getRandom6number(),
          email: payload.email!,
          emailVerified: true,
          isActive: true,
          password: this.hashUtils.hash(
            MathUtils.getRandom6number().toString(),
          ),
          userType: UserType.User,
          profile: {
            create: {
              avatar: payload.picture,
            },
          },
        },
        include: {
          profile: true,
        },
      });

      const token = this.jwtUtils.signAuthToken({
        tokenType: "auth",
        id: createdUser.id,
        userType: createdUser.userType,
        email: createdUser.email,
      });

      return { user: createdUser, token };
    }
  }
}
