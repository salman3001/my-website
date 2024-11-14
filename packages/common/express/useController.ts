import { Handler } from "express";
import { Controller } from "./Controller.js";

export const useController = function <T extends Controller>(
  controller: new (...args: any[]) => T,
  method: keyof T,
): Handler {
  return (req, res, next) => {
    const resolvedController = req.scope.resolve(controller.name);
    resolvedController[method](req, res, next);
  };
};
