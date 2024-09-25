import { Router } from "express";
import { CashDatasourceImpl, CashRepositoryImpl } from "../../infrastructure";
import { CashController } from "./cash.controller";

export class CashRoutes {
  static get routes(): Router {
    const router = Router();
    const datasourceI = new CashDatasourceImpl();
    const CashRepositoryI = new CashRepositoryImpl(datasourceI);
    const controller = new CashController(CashRepositoryI);

    router.post("/register", controller.addCash);

    router.get("/", controller.getAllCash);

    router.post("/assign-cash", controller.addCashToUser);

    return router;
  }
}
