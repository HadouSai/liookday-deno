import { Context } from "https://deno.land/x/oak@v6.0.2/context.ts";

export const login = async (ctx: Context) => {
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