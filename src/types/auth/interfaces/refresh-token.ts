import {IUserPreview} from "../../interfaces/user-preview";

export interface IRefreshToken extends IUserPreview {
  iat: number;
}
