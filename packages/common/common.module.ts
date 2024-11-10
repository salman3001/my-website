import { asClass, createContainer } from "awilix";
import { Config } from "./server/config/config.js";
import { JwtUtils } from "./utils/JwtUtils.js";
import { PrismaUtils } from "./utils/PrismaUtils.js";

const CommonModule = createContainer();

// conifg
CommonModule.register(Config.name, asClass(Config).singleton());

// utils
CommonModule.register(JwtUtils.name, asClass(JwtUtils).singleton());
CommonModule.register(PrismaUtils.name, asClass(PrismaUtils).singleton());

export { CommonModule };
