import { GQLError } from "https://deno.land/x/oak_graphql/mod.ts";

import db from "../config/database.ts";
import Token from "../utils/token.ts";

const usersDb = db.collection("users");
const tokensUsed = db.collection("tokensUsed");
//aca ya me dieron los datos que son
export default {
  async getUsers() {
    return await usersDb.find();
  },
  //verificar en cada cosa que no este el token en la white list
  async logOut(token: string) {
    if (!token) {
      return "Token not Found";
    }

    const IsValidToken = Token.validateToken(token);

    tokensUsed.insertOne({ token });

    if (!IsValidToken) {
      return false;
    }

    return "Succesfull logout";
  },
};
