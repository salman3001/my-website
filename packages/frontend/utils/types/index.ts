import type { User } from "./modals";

export interface AuthUser extends User{
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
