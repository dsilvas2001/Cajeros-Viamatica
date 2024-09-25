import "dotenv/config";
import env from "env-var";
console.log(process.env.PORT);
console.log(process.env.POSTGRE_HOST);

export const envs = {
  PORT: env.get("PORT").required().asPortNumber(),
  JWT_SEED: env.get("JWT_SEED").required().asString(),
  DB_USER: env.get("POSTGRE_USER").required().asString(),
  DB_PASSWORD: env.get("POSTGRE_PASS").required().asString(),
  DB_HOST: env.get("POSTGRE_HOST").required().asString(),
  DB_NAME: env.get("POSTGRE_DB_NAME").required().asString(),
  DB_URL: env.get("POSTGRE_URL").required().asString(),
  DB_PORT: env.get("POSTGRE_PORT").required().asInt(),
};
