import {IUserPreview} from "../../interfaces/user-preview";

interface IAccessToken extends IUserPreview {
  iat: number;
  exp: number;
}

export {
  IAccessToken,
};
