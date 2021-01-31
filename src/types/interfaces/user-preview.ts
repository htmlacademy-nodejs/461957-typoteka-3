import {IUserId} from "./user-id";

export interface IUserPreview extends IUserId {
  firstName: string;
  lastName: string;
  avatar: string;
}
