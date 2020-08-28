import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";

export default {
  async bCrypt(StringToHash: string) {
    const hash = await bcrypt.hash(StringToHash);
    return hash;
  },

  async verify(password: string, hash: string) {
    const result = await bcrypt.compare(password, hash);
    return result;
  },
};
