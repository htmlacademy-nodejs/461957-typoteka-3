import {IRoleId} from "./role-id";

interface IUserCreating extends IRoleId {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  avatar: string;
}

interface IUserCreatingDoublePasswords extends IUserCreating {
  passwordRepeated: string;
}

type UserCreatingFromForm = Omit<IUserCreatingDoublePasswords, `roleId`>;

export {
  IUserCreating,
  IUserCreatingDoublePasswords,
  UserCreatingFromForm,
};
