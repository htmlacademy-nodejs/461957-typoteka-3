import {IUserCreating} from "./user-creating";
import {IUserId} from "./user-id";

interface IUser extends IUserCreating, IUserId {}

export {
  IUser,
};
