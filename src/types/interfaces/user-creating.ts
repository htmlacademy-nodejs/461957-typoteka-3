import {IRoleId} from "./role-id";

export interface IUserCreating extends IRoleId {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  avatar: string;
}

export interface IUserCreatingDoublePasswords extends IUserCreating {
  passwordRepeated: string;
}

export type UserCreatingFromForm = Omit<IUserCreatingDoublePasswords, `roleId`>;
