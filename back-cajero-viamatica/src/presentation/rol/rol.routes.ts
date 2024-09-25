import { Router } from "express";
import { RolDatasourceImpl, RolRepositoryImpl } from "../../infrastructure";
import { RolController } from "./rol.controller";

export class RolRoutes {
  static get routes(): Router {
    const router = Router();
    const datasourceI = new RolDatasourceImpl();
    const RolRepositoryI = new RolRepositoryImpl(datasourceI);
    const controller = new RolController(RolRepositoryI);

    router.post("/register", controller.addRol);

    router.get("/", controller.getAllRol);

    return router;
  }
}
