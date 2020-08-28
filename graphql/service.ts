import { Router } from "https://deno.land/x/oak/mod.ts";
import { applyGraphQL } from "https://deno.land/x/oak_graphql/mod.ts";

import Querys from "./querys.ts";
import Mutations from "./mutations.ts";
import Types from "./typeDef.ts";

const GraphQLService = await applyGraphQL<Router>({
  Router,
  typeDefs: Types,
  resolvers: {
    Query: Querys.Query,
    Mutation: Mutations.Mutation,
  },
  /*context: (ctx: RouterContext) => {
    return { user: "Aaron" };
  },*/
});

export default GraphQLService;
