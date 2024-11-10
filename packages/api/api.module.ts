import { createContainer } from "awilix";
import { CommonModule } from "my-website.common/common.module.js";
import { ServicesModule } from "my-website.services/services.module.js";

const ApiModule = createContainer();
ApiModule.register({
  ...CommonModule.registrations,
  ...ServicesModule.registrations,
});

export { ApiModule };
