import {IUserId} from "./user-id";
import {IRoleId} from "./role-id";

interface IUserPreview extends IUserId, IRoleId {
  firstName: string;
  lastName: string;
  avatar: string;
}

export {
  IUserPreview,
};
