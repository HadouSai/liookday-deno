import Validatation from "../validations/validate-mutations.ts";
import Resolver from "./resolver.ts";

export default {
  Mutation: {
    singIn: async (
      _: any,
      { input: { username, email, password } }: any,
      ctx: any,
      info: any,
    ) => {
      const token = await Resolver.signIn(username, email, password);
      return { token };
    },

    login: async (_: any, { input: { email, password } }: any) => {
      const token = await Resolver.login(email, password);
      return { token };
    },

    logOut: async (_: any, { input: { token } }: any) => {
      const succesfullLogout = await Resolver.logOut(token);

      if (!succesfullLogout) {
        new Error("Something is wrong");
      }

      return { msg: "Logout Succesfully" };
    },
  },
};
