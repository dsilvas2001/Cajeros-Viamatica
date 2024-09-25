import { envs } from "./config";

import express from "express";
import cors from "cors";
import { AppRoutes } from "./presentation";
import { AppDataSource } from "./data";

const app = express();

app.use(cors());
app.use(express.json());
app.use(AppRoutes.routes);

AppDataSource.initialize();

app.listen(envs.PORT, () => {
  console.log(`Listen posrt: ${envs.PORT}`);
});
