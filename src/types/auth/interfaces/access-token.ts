import {IUserPreview} from "../../interfaces/user-preview";

export interface IAccessToken extends IUserPreview {
  iat: number;
  exp: number;
}
