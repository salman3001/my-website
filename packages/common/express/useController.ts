import { Handler } from "express";
import { Controller } from "./Controller.js";

export const useController = function <T extends Controller>(
  controller: new (...args: any[]) => T,
  method: keyof T,
): Handler {
  return async (req, res, next) => {
    const resolvedController = req.scope.resolve(controller.name);
    await resolvedController[method](req, res, next);
  };
};
