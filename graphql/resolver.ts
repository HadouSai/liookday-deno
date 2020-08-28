import { GQLError } from "https://deno.land/x/oak_graphql/mod.ts";

import db from "../config/database.ts";
import Hash from "../utils/hash-password.ts";
import Token from "../utils/token.ts";
import Validatation from "../validations/validate-mutations.ts";
import { User } from "../login.interface.ts";

const usersDb = db.collection("users");
const tokensUsed = db.collection("tokensUsed");
//aca ya me dieron los datos que son
export default {
  async getUsers() {
    return await usersDb.find();
  },

  async signIn(username: string, email: string, password: string) {
    const success = await Validatation.validateSingIn(
      username,
      email,
      password,
    );

    if (!success) throw new Error("Some parameters are missing");

    const userExist = await usersDb.findOne({ email });

    if (userExist) throw new Error("User already Exist");

    const passEncrypted = await Hash.bCrypt(password);

    const user = await usersDb.insertOne({
      username,
      email,
      password: passEncrypted,
      emailConfirmation: false,
      userAccountStatus: "active",
      created_at: new Date().getTime(),
    });

    console.log(user);

    if (!user) {
      throw new GQLError(
        { type: "Account failed", detail: "Account can't be created!" },
      );
    }

    return Token.generateToken(user.$oid);
  },

  async login(email: string, password: string) {
    const noErrors = await Validatation.validateLogin(email, password);

    if (!noErrors) {
      throw new GQLError(
        { type: "Account failed", detail: "Email or password missing" },
      );
    }

    const user = await usersDb.findOne({ email: email });

    console.log(user);

    if (!user) {
      throw new GQLError(
        { type: "Account failed", detail: "User not found" },
      );
    }

    //const passwordMatch = await Hash.verify(password, user?.password);

    //if (!passwordMatch) {
    //  throw new GQLError(
    //    { type: "Account failed", detail: "Password doesn't Match" },
    //  );
    //}

    return Token.generateToken(user._id.$oid);
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
