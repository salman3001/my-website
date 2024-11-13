import { ApiModule } from "api.module.js";
import { app } from "my-website.common/express/ExpressApp.js";
import { Controller } from "my-website.common/express/Controller.js";
import { asClass } from "awilix";
import { Middleware } from "my-website.common/express/Middleware.js";
import { Handler } from "express";

class LogerMiddleware extends Middleware {
  private singltonService: SingltonService;
  constructor(opt: { SingltonService: SingltonService }) {
    super();
    console.log("middleware created");
    this.singltonService = opt.SingltonService;
  }

  handle: Handler = async (req, res, next) => {
    console.log("middleware invoked");
    this.singltonService.test();
    next();
  };
}

class TempController extends Controller {
  private singltonService: SingltonService;

  constructor(opt: { SingltonService: SingltonService }) {
    super();
    console.log("controller created");
    this.singltonService = opt.SingltonService;
  }

  home: Handler = async (req, res, next) => {
    console.log("invoked controller");
    this.singltonService.test();
    return res.custom({
      code: 200,
      success: true,
      message: "Working",
    });
  };
}

class SingltonService {
  constructor() {
    console.log("singleton service created");
  }
  test() {
    console.log("test invoked");
  }
}

ApiModule.register(TempController.name, asClass(TempController).scoped());
ApiModule.register(LogerMiddleware.name, asClass(LogerMiddleware).scoped());
ApiModule.register(SingltonService.name, asClass(SingltonService).singleton());

app.addContainer(ApiModule);
app.useMiddleware(LogerMiddleware);

app.mapGet("/", TempController, "home");

app.listen(3000, () => {
  console.log("listeining on 3000");
});
