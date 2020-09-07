import { Application, Router, Context } from "https://deno.land/x/oak/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

import * as flags from "https://deno.land/std/flags/mod.ts";
import GraphQLService from "./graphql/service.ts";

//import { login } from "./middleware/auth/routes.ts";
import login from "./test.ts";

const env = config();
const { args } = Deno;
const DEFAULT_PORT = 8080;
const DEFAULT_HOST = env.DEFAULT_HOST || "http://localhost";
const argPort = flags.parse(args).port;
const port = argPort ? Number(argPort) : DEFAULT_PORT;

const app = new Application();
const router = new Router();

/* app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
}); */

router
  .post("/login", login);
//.post("/signin", sigIn);

app.use(router.routes());
app.use(router.allowedMethods());

//app.use(GraphQLService.routes(), GraphQLService.allowedMethods());

console.log(`Server start at ${DEFAULT_HOST}:${port}`);
await app.listen({ port });
