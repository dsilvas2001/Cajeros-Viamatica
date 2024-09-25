import { Router } from "express";
import { UserDatasourceImpl, UserRepositoryImpl } from "../../infrastructure";
import { UserController } from "./user.controller";

export class UserRoutes {
  static get routes(): Router {
    const router = Router();
    const datasourceI = new UserDatasourceImpl();
    const userRepositoryI = new UserRepositoryImpl(datasourceI);
    const controller = new UserController(userRepositoryI);

    router.post("/register", controller.addUser);
    router.get("/", controller.getAllUsers);
    router.put("/update/:id", controller.updateUser);
    router.put("/validator/:id", controller.validatorUser);

    router.delete("/:id", controller.deleteUser);

    router.post("/auth", controller.findByCredentials);

    return router;
    //
  }
}
