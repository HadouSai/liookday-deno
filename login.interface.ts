export interface User {
  _id: Oid;
  username?: string;
  email?: string;
  password: string;
  emailConfirmation: false;
  userAccountStatus: "active";
  created_at: string;
  updated_at?: string;
  loginTrys: number;
  userImg?: string;
}

export interface Oid {
  $oid: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface context {
  type: any;
  value: any;
}
