import db from "../../../config/database.ts";
import validation from "../../../validations/validate-login.ts";
import {
  LoginUser,
  User,
  SingInUser,
  LogOut,
} from "../../../login.interface.ts";
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

    usersDb.updateOne(
      { _id: user._id },
      { ...user, loginTrys: 0 },
    );

    return {
      data: {
        token: await TOKEN.generateToken(user._id.$oid),
        username: user.username,
        userImg: user.userImg,
      },
      error: null,
      message: "Login succesfull",
    };
  },
  async signIn(value: SingInUser) {
    const error = validation.validateSingIn(value);

    if (error) {
      return { error };
    }

    const user = await usersDb.findOne({ email: value.email });

    if (user) {
      return {
        error: {
          type: "Registration Failed",
          detail: "User already exists!",
          status: 404,
        },
      };
    }

    const passwordEncrypted = await HASH.bCrypt(value.password);

    if (!passwordEncrypted) {
      return {
        error: {
          type: "Registration Failed",
          detail: "Password couldn't be created!",
          status: 400,
        },
      };
    }

    const actualTime = new Date().getTime();

    const userReady = await usersDb.insertOne({
      username: value.username,
      email: value.email,
      password: passwordEncrypted,
      emailConfirmation: false,
      userAccountStatus: "active",
      created_at: actualTime,
      updated_at: actualTime,
      loginTrys: 0,
      userImg: "",
    });

    if (!userReady) {
      return {
        error: {
          type: "Registration Failed",
          detail: "User couldn't be created!",
          status: 400,
        },
      };
    }

    return {
      data: {
        token: await TOKEN.generateToken(userReady.$oid),
        username: value.username,
        userImg: value.userImg,
      },
      error: null,
      message: "User created succesfull",
    };
  },
  async logOut(value: LogOut) {
    console.log(value);
    return {
      error: null,
      status: 400,
      message: "LogOut succesfull",
    };
  },
};
