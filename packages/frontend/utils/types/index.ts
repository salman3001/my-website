import type { UserType } from "./modals";

export interface AuthUser {
  id: number;
  fullName: string;
  email: string;
  password: string;
  phone: string;
  userType: UserType;
  isActive: boolean;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type IResType<T> = {
  code: number;
  success: boolean;
  message?: string;
  data?: T;
  errors?: ValidationErrorObj;
};

type ValidationError = {
  _errors: string[];
};

export type ValidationErrorObj =
  | (ValidationError & {
      [key: string]: ValidationErrorObj;
    })
  | null;

export interface IPaginated<T> {
  count: number;
  data: T;
}
