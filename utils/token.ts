import { validateJwt } from "https://deno.land/x/djwt/validate.ts";
import {
  makeJwt,
  setExpiration,
  Jose,
  Payload,
} from "https://deno.land/x/djwt/create.ts";

const key = "sx3{!2ITet$1-/0";

const header: Jose = {
  alg: "HS256",
  typ: "JWT",
};

export default {
  async generateToken(userId: string): Promise<string> {
    const payload: Payload = {
      uid: userId,
      exp: setExpiration(new Date().getTime() + 60000),
    };

    return await makeJwt({ key, header, payload });
  },

  async validateToken(jwt: any) {
    return (await validateJwt({ jwt, key, algorithm: "HS256" })).isValid;
  },
};
