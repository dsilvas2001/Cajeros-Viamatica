import { Router } from "express";
import {
  UserStatusDatasourceImpl,
  UserStatusRepositoryImpl,
} from "../../infrastructure";
import { UserStatusController } from "./user-status.controller";

export class UserStatusRoutes {
  static get routes(): Router {
    const router = Router();
    const datasourceI = new UserStatusDatasourceImpl();
    const userStatusRepositoryI = new UserStatusRepositoryImpl(datasourceI);
    const controller = new UserStatusController(userStatusRepositoryI);

    router.post("/register", controller.addUserStatus);

    router.get("/", controller.getAllUserStatus);

    return router;
  }
}
