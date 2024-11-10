import { AwilixContainer } from "awilix";
import { AuthUserType } from "../services/types/common.ts";
import { ResType } from "my-website.common/types/index.ts";

declare global {
  namespace Express {
    interface Request {
      scope: AwilixContainer<any>;
      user: AuthUserType;
    }
    interface Response {
      custom: (opts: ResType<any>) => void;
    }
  }
}
