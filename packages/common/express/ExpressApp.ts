import express from "express";
import { AwilixContainer } from "awilix";
import { AuthUserType, ResType } from "../types/index.js";
const app = express();

// App Extensions

app.addContainer = function (container: AwilixContainer) {
  this.use((req, res, next) => {
    req.scope = container.createScope();
    next();
  });
};

// response extensions

app.response.custom = function <T>(opt: ResType<T>) {
  const { code, ...payload } = opt;
  return this.status(opt.code).json(payload);
};

declare global {
  namespace Express {
    export interface Application {
      addContainer(container: AwilixContainer): void;
    }

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

export { app };
