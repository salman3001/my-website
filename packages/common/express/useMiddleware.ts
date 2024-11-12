import { Handler } from "express";
import { Middleware } from "./Middleware.js";

export const useMiddlware =
  <T extends Middleware>(middleware: new (...args: any[]) => T): Handler =>
  async (req, res, next) => {
    const resolvedMiddleware = req.scope.resolve<Middleware>(middleware.name);
    await resolvedMiddleware.handle();
  };
