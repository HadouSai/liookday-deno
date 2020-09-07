import db from "../../../config/database.ts";
import validation from "../../../validations/validate-login.ts";
import { LoginUser, User } from "../../../login.interface.ts";
import HASH from "../../../utils/hash-password.ts";
import TOKEN from "../../../utils/token.ts";

const usersDb = db.collection<User>("users");
const tokensUsed = db.collection("tokensUsed");

export default {
  async login(value: LoginUser) {
    const error = validation.validateLogin(value);

    if (error) {
      return { error };
    }

    const user = await usersDb.findOne({ email: value.email });

    if (!user) {
      return {
        error: {
          type: "Autentification Failed",
          detail: "User doesn't exist!",
          status: 404,
        },
      };
    }

    const passwordMatch = await HASH.verify(value.password, user.password);

    if (!passwordMatch) {
      usersDb.updateOne(
        { _id: user._id },
        { ...user, loginTrys: Number(user.loginTrys + 1) },
      );

      return {
        error: {
          type: "Autentification Failed",
          detail: "Password doesn't match!",
          status: 404,
        },
      };
    }

    return { token: await TOKEN.generateToken(user._id.$oid), error: null };
  },
};
