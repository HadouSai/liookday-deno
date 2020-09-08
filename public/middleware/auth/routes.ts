import RESOLVER from "./resolvers.ts";
import { RouterContext } from "https://deno.land/x/oak@v6.0.2/router.ts";

/* export const login = async (ctx: Context) => {
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
}; */
export const login = async (ctx: RouterContext) => {
  const value = await ctx.request.body().value;
  //const succesfull = await RESOLVER.login(value);
  console.log(value);
  const succesfull = {
    error: {
      type: "Autentification Failed",
      detail: "User doesn't exist!",
      status: 404,
    },
  };

  if (succesfull.error) {
    ctx.response.status = succesfull.error.status;
    ctx.response.body = {
      ...succesfull,
    };
  } else {
    ctx.response.status = 200;
  }
};

/* export const sigIn = (ctx: Context) => {
  ctx.response.body = "SigIn Success";
}; */
