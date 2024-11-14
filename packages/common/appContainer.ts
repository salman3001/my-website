import { asClass, createContainer } from "awilix";
import { Config } from "./config/config.js";
import { JwtUtils } from "./utils/JwtUtils.js";
import { PrismaUtils } from "./utils/PrismaUtils.js";
import { HashUtils } from "./utils/HashUtils.js";
export { asClass, asFunction, asValue, type AwilixContainer } from "awilix";

const appContainer = createContainer({ injectionMode: "CLASSIC" });

appContainer.register("config", asClass(Config).singleton());
appContainer.register("jwtUtils", asClass(JwtUtils).singleton());
appContainer.register("prismaUtils", asClass(PrismaUtils).singleton());
appContainer.register("hashUtils", asClass(HashUtils).singleton());

export { appContainer };
