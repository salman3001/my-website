import { ApiModule } from "api.module.js";
import { ExpressApp } from "my-website.common/express/ExpressApp.js";
import { setScoppedContainer } from "my-website.common/express/setScoppedContainer.js";
import { useController } from "my-website.common/express/useController.js";
import { Controller } from "my-website.common/express/Controller.js";
import { HttpContext } from "my-website.common/express/HttpContext.js";
import { asClass } from "awilix";
import { Middleware } from "my-website.common/express/Middleware.js";
import { useMiddlware } from "my-website.common/express/useMiddleware.js";

class LogerMiddleware extends Middleware {
  private context: HttpContext;
  private singltonService: SingltonService;
  constructor(opt: {
    HttpContext: HttpContext;
    SingltonService: SingltonService;
  }) {
    super();
    console.log("middleware created");
    this.context = opt.HttpContext;
    this.singltonService = opt.SingltonService;
  }
  async handle() {
    console.log("middleware invoked");
    this.singltonService.test();
    this.context.next();
  }
}

class TempController extends Controller {
  private context: HttpContext;
  private singltonService: SingltonService;

  constructor(opt: {
    HttpContext: HttpContext;
    SingltonService: SingltonService;
  }) {
    super();
    console.log("controller created");
    this.singltonService = opt.SingltonService;
    this.context = opt.HttpContext;
  }

  home() {
    console.log("invoked controller");
    this.singltonService.test();
    return this.context.res.send({
      code: 200,
      success: true,
      message: "Working",
    });
  }
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

const app = ExpressApp();
app.use(setScoppedContainer(ApiModule));
app.use(useMiddlware(LogerMiddleware));

app.get("/", useController(TempController, "home"));

app.listen(3000, () => {
  console.log("listeining on 3000");
});
