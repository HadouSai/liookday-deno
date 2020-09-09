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
};
