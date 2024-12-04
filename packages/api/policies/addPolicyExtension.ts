import { appContainer, asClass } from "my-website.common/appContainer.js";
import { AuthenticatedOnlyPolicy } from "./AuthenticatedOnlyPolicy.js";
import { AdminsOnlyPolicy } from "./AdminsOnlyPolicy.js";

appContainer.addPolicies = function () {

  this.register(AuthenticatedOnlyPolicy.name, asClass(AuthenticatedOnlyPolicy).singleton());
  this.register(AdminsOnlyPolicy.name, asClass(AdminsOnlyPolicy).singleton());

};

declare module "my-website.common/appContainer.js" {
  export interface AwilixContainer {
    addPolicies(): void;
  }
}
