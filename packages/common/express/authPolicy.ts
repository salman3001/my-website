import { Handler } from "express";
import { IPolicy } from "./interfaces/IPolicy.js";

export const authPolicy = function (policies: (typeof IPolicy)[]): Handler {
  return async (req, res, next) => {
    for (const policy of policies) {
      const policyHandler = req.scope.resolve<IPolicy>(policy.name);
      await policyHandler.handle(req, res);
    }
    next();
  };
};
