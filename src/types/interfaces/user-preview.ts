import {IUserId} from "./user-id";
import {IRoleId} from "./role-id";

export interface IUserPreview extends IUserId, IRoleId {
  firstName: string;
  lastName: string;
  avatar: string;
}
