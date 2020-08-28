import Token from "../utils/token.ts";
import db from "../config/database.ts";
import { GQLError } from "https://deno.land/x/oak_graphql/mod.ts";

const TokensUsed = db.collection("tokensUsed");

export default {
  /** valida si el token es correcto y no fue usado */
  async tokenUnUsed(token: string) {
    const isValid = Token.validateToken(token);

    if (!isValid) {
      throw new GQLError(
        { type: "Authentication failed", detail: "Token Invalid!" },
      );
    }

    const tokenUsed = await TokensUsed.findOne({ token });

    if (tokenUsed) {
      throw new GQLError(
        { type: "Authentication failed", detail: "Token Used!" },
      );
    }
  },

  async validateUsers(authorization: any) {
    console.log(authorization);
    //const token = authorization.replace('Bearer ', '');
    //await this.tokenUnUsed(token)
    // return;
  },
};
