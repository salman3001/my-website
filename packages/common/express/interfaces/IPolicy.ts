import { NextFunction, Request, Response } from "express";

export abstract class IPolicy {
  abstract handle(req: Request, res: Response): Promise<void>;
}
