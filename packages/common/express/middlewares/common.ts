import cors from "cors";
import { static as staticMiddleware } from "express";
import { json } from "express";
import { urlencoded } from "express";
import cookieParser from "cookie-parser";

export { cors, staticMiddleware, urlencoded, json, cookieParser };
