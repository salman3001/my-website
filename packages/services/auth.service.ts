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
} from "./types/common.js";
import { RegisterDto } from "my-website.common/dtos/auth/register.dto.js";
import { LoginDto } from "my-website.common/dtos/auth/login.dto.js";
import { ForgotPasswordOtpDto } from "my-website.common/dtos/auth/forgotPasswordOtp.dto.js";
import { ConfirmEmailDto } from "my-website.common/dtos/auth/confirmEmail.dto.js";
import { ResetPasswordDto } from "my-website.common/dtos/auth/resetPassword.dto.js";
import { MathUtils } from "my-website.common/utils/MathUtils.js";
import {
  UnAuthorizedException,
  BadRequestException,
} from "my-website.common/express/exceptions/index.js";
import { JwtUtils } from "my-website.common/utils/JwtUtils.js";
import { HashUtils } from "my-website.common/utils/HashUtils.js";

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

    const token = this.jwtUtils.sign({
      tokenType: "auth",
      id: user.id,
      userType: user.userType,
      email: user.email,
    } as IJwtPayload);

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
        userName: rest.fullName + MathUtils.getRandom6number(),
        emailVerified: false,
        userType: UserType.User,
        isActive: true,
        profile: {},
      },
    });

    if (user) {
      this.authEvents.emitUserSignedUp(user);
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

  async forgotPasswordOtp(dto: ForgotPasswordOtpDto) {
    const user = await this.prisma.user.findFirstOrThrow({
      where: {
        email: dto.email,
      },
    });

    this.authEvents.emitUserForgotPassword(user);
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
}
