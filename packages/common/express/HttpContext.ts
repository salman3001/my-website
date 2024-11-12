import { NextFunction, Request, Response } from "express";

export class HttpContext {
  constructor(
    public req: Request,
    public res: Response,
    public next: NextFunction,
  ) {}
}
