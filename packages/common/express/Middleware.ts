import { Handler } from "express";

export abstract class Middleware {
  abstract handle: Handler;
}
