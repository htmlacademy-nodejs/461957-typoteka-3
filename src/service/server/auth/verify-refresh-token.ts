import {ENV} from "../../../shared/env/env";
import {HttpCode} from "../../../constants-es6";
import {IUserPreview} from "../../../types/interfaces/user-preview";
import {verify} from "jsonwebtoken";

export async function verifyRefreshToken(token: string): Promise<IUserPreview> {
  return new Promise((resolve, reject) => {
    verify(token, ENV.JWT_REFRESH_SECRET, (err, userData: IUserPreview & unknown) => {
      if (err) {
        reject(HttpCode.FORBIDDEN);
      }
      resolve(extractUserFromToken(userData));
    });
  });
}

function extractUserFromToken(refreshToken: IUserPreview & unknown): IUserPreview {
  return {
    id: refreshToken.id,
    avatar: refreshToken.avatar,
    firstName: refreshToken.firstName,
    lastName: refreshToken.lastName,
    roleId: refreshToken.roleId,
  };
}