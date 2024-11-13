import express, { Handler, Router, Express } from "express";
import { Controller } from "./Controller.js";
import { Middleware } from "./Middleware.js";
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

app.useMiddleware = function <T extends Middleware>(
  middleware: new (...args: any[]) => T,
) {
  this.use((req, res, next) => {
    const resolvedMiddleware = req.scope.resolve<Middleware>(middleware.name);
    resolvedMiddleware.handle(req, res, next);
  });
};

app.useApp = function (path: string, app: Express) {
  this.use(path, app);
};

app.mapGet = function <T extends Controller>(
  path: string,
  controller: new (...args: any[]) => T,
  method: keyof T,
) {
  this.get(path, (req, res, next) => {
    const resolvedController = req.scope.resolve(controller.name);
    resolvedController[method](req, res, next);
  });
};

app.mapPost = function <T extends Controller>(
  path: string,
  controller: new (...args: any[]) => T,
  method: keyof T,
) {
  this.post(path, (req, res, next) => {
    const resolvedController = req.scope.resolve(controller.name);
    resolvedController[method](req, res, next);
  });
};

app.mapPatch = function <T extends Controller>(
  path: string,
  controller: new (...args: any[]) => T,
  method: keyof T,
) {
  this.patch(path, (req, res, next) => {
    const resolvedController = req.scope.resolve(controller.name);
    resolvedController[method](req, res, next);
  });
};

app.mapDelete = function <T extends Controller>(
  path: string,
  controller: new (...args: any[]) => T,
  method: keyof T,
) {
  this.patch(path, (req, res, next) => {
    const resolvedController = req.scope.resolve(controller.name);
    resolvedController[method](req, res, next);
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

      useMiddleware<T extends Middleware>(
        middleware: new (...args: any[]) => T,
      ): void;

      useApp(path: string, app: Express): void;

      mapGet<T extends Controller>(
        path: string,
        controller: new (...args: any[]) => T,
        method: keyof T,
      ): void;

      mapPost<T extends Controller>(
        path: string,
        controller: new (...args: any[]) => T,
        method: keyof T,
      ): void;

      mapPatch<T extends Controller>(
        path: string,
        controller: new (...args: any[]) => T,
        method: keyof T,
      ): void;

      mapDelete<T extends Controller>(
        path: string,
        controller: new (...args: any[]) => T,
        method: keyof T,
      ): void;
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
