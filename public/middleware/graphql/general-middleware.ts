import { Context } from "https://deno.land/x/oak@v6.0.2/context.ts";
import { GQLError } from "https://deno.land/x/oak_graphql@0.6.1/mod.ts";

import TOKEN from "../../../utils/token.ts";

export const GraphqlContext = async (ctx: any) => {
  const headers = ctx.request.headers;
  const authorization = headers.get("Authorization");

  if (!authorization) {
    ctx.response.status = 401;

    throw new GQLError(
      {
        type: "Authentification failed",
        detail: "Token doesn't exist",
      },
    );
  }

  const accesAllowed = await TOKEN.validateToken(authorization);

  if (!accesAllowed) {
    ctx.response.status = 401;

    throw new GQLError(
      {
        type: "Authentification failed",
        detail: "Token Invalid",
      },
    );
  }

  return {
    req: ctx.request,
    res: ctx.response,
  };
};
