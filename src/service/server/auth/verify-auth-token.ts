import {ENV} from "../../../shared/env/env";
import {HttpCode} from "../../../constants-es6";
import {IUserPreview} from "../../../types/interfaces/user-preview";
import {verify} from "jsonwebtoken";

export async function verifyAuthToken(token: string): Promise<IUserPreview> {
  return new Promise((resolve, reject) => {
    verify(token, ENV.JWT_REFRESH_SECRET, (err, userData) => {
      if (err) {
        reject(HttpCode.FORBIDDEN);
      }
      resolve(userData as IUserPreview);
    });
  });
}
