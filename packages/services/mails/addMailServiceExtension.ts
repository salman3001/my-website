import {
  appContainer,
  asClass,
  asValue,
} from "my-website.common/appContainer.js";
import { MailServiceOptions } from "./interface/MailServiceOptions.js";
import { NodeMailService } from "./nodeMailer.service.js";
import { ResendMailService } from "./resendMailer.Service.js";

appContainer.addMailService = function (options: MailServiceOptions) {
  if (options.adapter === "NodeMailer") {
    this.register("mailServiceOptions", asValue(options.adapterConfig));
    this.register("mailService", asClass(NodeMailService).singleton());
  }

  if (options.adapter === "Resend") {
    this.register("mailServiceOptions", asValue(options.adapterConfig));
    this.register("mailService", asClass(ResendMailService).singleton());
  }
};

declare module "my-website.common/appContainer.js" {
  export interface AwilixContainer {
    addMailService(options: MailServiceOptions): void;
  }
}
