import { Context } from "https://deno.land/x/oak@v6.0.2/context.ts";
import RESOLVER from "../auth/resolvers.ts";

export const login = async (ctx: Context) => {
  const value = await ctx.request.body().value;
  const succesfull = await RESOLVER.login(value);

  if (succesfull.error) {
    ctx.response.status = succesfull.error.status;
    ctx.response.body = {
      ...succesfull,
    };
  } else {
    ctx.response.status = 200;
    ctx.response.body = {
      token: succesfull.token,
    };
  }
};

export const sigIn = (ctx: Context) => {
  ctx.response.body = "SigIn Success";
};