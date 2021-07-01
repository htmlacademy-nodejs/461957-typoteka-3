import {IUserPreview} from "../../interfaces/user-preview";

interface IRefreshToken extends IUserPreview {
  iat: number;
}

export {
  IRefreshToken,
};
