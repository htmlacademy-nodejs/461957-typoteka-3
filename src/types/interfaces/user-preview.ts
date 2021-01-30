import {IUser} from "./user";

export interface IUserPreview extends IUser {
  firstName: string;
  lastName: string;
  avatar: string;
}
