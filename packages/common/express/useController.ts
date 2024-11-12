import { Handler } from "express";
import { Controller } from "./Controller.js";
import { AwilixContainer, asValue } from "awilix";
import { HttpContext } from "./HttpContext.js";
import { Middleware } from "./Middleware.js";

class x extends Controller {
  getUser() {}
}

export const useController =
  <T extends Controller>(
    controller: new (...args: any[]) => T,
    method: keyof T,
  ): Handler =>
  (req, res) => {
    const resolvedController = req.scope.resolve(controller.name);
    resolvedController[method]();
  };
