import { Router } from "express";
import { ClientRoutes } from "./client/client.routes";
import { RolRoutes } from "./rol/rol.routes";
import { UserStatusRoutes } from "./user-status/user-status.routes";
import { UserRoutes } from "./user/user.routes";
import { CashRoutes } from "./cash/cash.routes";
import { TurnRoutes } from "./turn/turn.routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/client", ClientRoutes.routes);
    router.use("/rol", RolRoutes.routes);
    router.use("/user-status", UserStatusRoutes.routes);

    router.use("/user", UserRoutes.routes);

    router.use("/cash", CashRoutes.routes);

    router.use("/turn", TurnRoutes.routes);

    return router;
  }
}
