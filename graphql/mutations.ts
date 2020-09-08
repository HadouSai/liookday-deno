import Validatation from "../validations/validate-mutations.ts";
import Resolver from "./resolver.ts";

export default {
  Mutation: {
    logOut: async (_: any, { input: { token } }: any) => {
      const succesfullLogout = await Resolver.logOut(token);

      if (!succesfullLogout) {
        new Error("Something is wrong");
      }

      return { msg: "Logout Succesfully" };
    },
  },
};
