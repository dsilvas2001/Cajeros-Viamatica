import { Router } from "express";
import { TurnDatasourceImpl } from "../../infrastructure/datasource/turn.datasource.impl";
import { TurnRepositoryImpl } from "../../infrastructure/repositories/turn.repository.impl";
import { TurnController } from "./turn.controller";

export class TurnRoutes {
  static get routes(): Router {
    const router = Router();
    const datasourceI = new TurnDatasourceImpl();
    const turnRepositoryI = new TurnRepositoryImpl(datasourceI);
    const controller = new TurnController(turnRepositoryI);

    router.post("/register", controller.addTurn);

    router.get("/", controller.getAllTurns);

    //   router.put("/update/:id", controller.updateClient);

    router.delete("/:id", controller.deleteTurn);

    return router;
  }
}
