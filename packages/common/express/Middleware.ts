import { Handler, Response } from "express";
import { promise } from "zod";

export abstract class Middleware {
  abstract handle(): Promise<void | Response["custom"]>;
}
