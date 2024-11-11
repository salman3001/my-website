import jwt from "jsonwebtoken";
import { compareSync, hashSync } from "bcrypt";
import {
  PrismaClient,
  User,
  UserType,
} from "my-website.data/generates/index.js";
import { AuthEvents } from "./events/auth.events.js";
import { Prisma } from "my-website.data/prisma.js";
import { BadRequestException } from "../common/server/exceptions/bad-request-exception.js";
import { UnAuthorizedException } from "../common/server/exceptions/unauthorized-exception.js";
import {
  IJwtPayload,
  JWTConfirmEmailPayload,
  JWTResetPasswordPayload,
} from "./types/common.js";
import { RegisterDto } from "my-website.common/dtos/auth/register.dto.js";
import { LoginDto } from "my-website.common/dtos/auth/login.dto.js";
import { ForgotPasswordOtpDto } from "my-website.common/dtos/auth/forgotPasswordOtp.dto.js";
import { ConfirmEmailDto } from "my-website.common/dtos/auth/confirmEmail.dto.js";
import { Config } from "../common/server/config/config.js";
import { ResetPasswordDto } from "my-website.common/dtos/auth/resetPassword.dto.js";
import { MathUtils } from "my-website.common/utils/MathUtils.js";

export class AuthService {
  private readonly config: Config;
  private readonly prisma: Prisma;
  private readonly authEvents: AuthEvents;
  constructor(opt: {
    Config: Config;
    PrismaClient: PrismaClient;
    AuthEvents: AuthEvents;
  }) {
    this.prisma = opt.PrismaClient;
    this.authEvents = opt.AuthEvents;
    this.config = opt.Config;
  }

  async login(dto: LoginDto): Promise<User> {
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

    const isPasswordValid = compareSync(dto.password, user.password);

    if (!isPasswordValid) {
      throw new UnAuthorizedException("Invalid Username or Password!");
    }

    return user;
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
        password: hashSync(password, 10),
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

  async confirmEmail(dto: ConfirmEmailDto): Promise<User> {
    const payload = this.varifyToken(dto.jwt) as JWTConfirmEmailPayload;

    if (payload.tokenType !== "confirm-email") {
      throw new BadRequestException("Invalid Token");
    }

    const user = await this.prisma.user.update({
      where: { email: payload.email },
      data: {
        emailVerified: true,
      },
    });

    return user;
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
    const payload = this.varifyToken(dto.jwt) as JWTResetPasswordPayload;

    if (payload.tokenType !== "reset-password" && !payload?.id) {
      throw new BadRequestException("Invalid Token");
    }

    const user = await this.prisma.user.update({
      where: {
        id: payload.id,
      },
      data: {
        password: hashSync(dto.password, 10),
      },
    });

    return user;
  }

  getToken(payload: IJwtPayload, opt?: jwt.SignOptions) {
    return jwt.sign(payload, this.config.envs.appSecrete!, opt);
  }

  varifyToken(token: string, silent?: boolean): jwt.JwtPayload | string | null {
    try {
      const payload = jwt.verify(token, this.config.envs.appSecrete!);
      return payload;
    } catch (error) {
      if (!silent) {
        throw new UnAuthorizedException(
          (error as any)?.message || "Un Authorzied",
        );
      }
      return null;
    }
  }
}
