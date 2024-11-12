import { AwilixContainer, asValue } from "awilix";
import { Handler } from "express";
import { HttpContext } from "./HttpContext.js";

export const setScoppedContainer =
  (container: AwilixContainer): Handler =>
  (req, res, next) => {
    const ctx = new HttpContext(req, res, next);

    req.scope = container.createScope();
    req.scope.register(HttpContext.name, asValue(ctx));
    console.log("ctx created");
    next();
  };
