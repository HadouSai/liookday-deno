export interface User {
  _id?: Oid;
  username?: string;
  email?: string;
  password: string;
  emailConfirmation: false;
  userAccountStatus: "active";
  created_at: number;
  updated_at: number;
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

export interface SingInUser extends LoginUser {
  username: string;
  userImg?: string;
}

export interface LogOut {
  token: string;
}

export interface context {
  type: any;
  value: any;
}
