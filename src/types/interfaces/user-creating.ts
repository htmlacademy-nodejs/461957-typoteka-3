import {Role} from "../role";
import {IRoleId} from "./role-id";

export interface IUserCreating extends IRoleId {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  avatar: string;
  roleId: Role;
}

export interface IUserCreatingDoublePasswords extends IUserCreating {
  passwordRepeated: string;
}
