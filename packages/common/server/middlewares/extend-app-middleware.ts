import { Handler } from "express";

export const extendAppMiddleware: Handler = (req, res, next) => {
  res.custom = (opt) => {
    const { code, ...payload } = opt;
    return res.status(opt.code).json(payload);
  };
  next();
};
