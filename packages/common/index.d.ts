import { AwilixContainer } from "awilix";
import { AuthUserType } from "../services/types/common";
import { ResType } from "./types/index.ts";

declare global {
  namespace Express {
    interface Request {
      scope: AwilixContainer<any>;
      user: AuthUserType;
      file: Express.Multer.File | undefined;
    }
    interface Response {
      custom: (opts: ResType<any>) => void;
    }
  }
}
