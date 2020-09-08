import RESOLVER from "./resolvers.ts";
//import { RouterContext } from "https://deno.land/x/oak@v6.0.2/router.ts";

export const login = async (ctx: any) => {
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

export const sigIn = async (ctx: any) => {
  const dataValue = await ctx.request.body().value;
  const succesfull = await RESOLVER.signIn(dataValue);

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
