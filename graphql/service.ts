import { Router } from "https://deno.land/x/oak/mod.ts";
import { applyGraphQL } from "https://deno.land/x/oak_graphql/mod.ts";

import { GraphqlContext } from "../public/middleware/graphql/general-middleware.ts";
import Querys from "./querys.ts";
import Mutations from "./mutations.ts";
import Types from "./typeDefs.ts";

const GraphQLService = await applyGraphQL<Router>({
  Router,
  typeDefs: Types,
  resolvers: {
    Query: Querys.Query,
    Mutation: Mutations.Mutation,
  },
  context: GraphqlContext,
});

export default GraphQLService;
