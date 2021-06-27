import {compare} from "bcrypt";
import {FindAttributeOptions} from "sequelize";

import {LoginStatus} from "../../../../constants";
import {ILogin} from "../../../../types/interfaces/login";
import {ILoginResult} from "../../../../types/interfaces/login-result";
import {IUserPreview} from "../../../../types/interfaces/user-preview";
import {UserId} from "../../../../types/user-id";
import {UserProperty} from "../constants/property-name";
import {IRefreshTokenModel} from "../models/refresh-tokens";
import {IUserModel} from "../models/user";

const userPreviewAttributes: FindAttributeOptions = [
  UserProperty.ID,
  [UserProperty.FIRST_NAME, `firstName`],
  [UserProperty.LAST_NAME, `lastName`],
  [UserProperty.ROLE_ID, `roleId`],
  UserProperty.AVATAR,
];

export class AuthService {
  constructor(private readonly UserModel: IUserModel, private readonly RefreshTokenModel: IRefreshTokenModel) {}

  public async login({email, password}: ILogin): Promise<ILoginResult> {
    let user: IUserPreview;
    try {
      user = await this.findByEmail(email);
    } catch (e) {
      return {state: LoginStatus.UNKNOWN_EMAIL};
    }
    try {
      const isPasswordValid = await this.checkPassword({userId: user.id, password});
      if (!isPasswordValid) {
        return {state: LoginStatus.INVALID_PASSWORD};
      }
    } catch (e) {
      return {state: LoginStatus.UNKNOWN_EMAIL};
    }
    return {state: LoginStatus.SUCCESS, user};
  }

  public async saveRefreshToken(token: string, userId: UserId): Promise<void> {
    const savedToken = await this.RefreshTokenModel.create({token, userId});
    return savedToken ? Promise.resolve() : Promise.reject(`Failed to save token`);
  }

  public async deleteRefreshToken(token: string): Promise<void> {
    const deletedToken = await this.RefreshTokenModel.destroy({
      where: {
        token,
      },
    });
    if (!deletedToken) {
      return Promise.reject(`Failed to delete token`);
    }
    return Promise.resolve();
  }

  private async checkPassword({userId, password}: {userId: UserId; password: string}): Promise<boolean> {
    const savedHash = await this.UserModel.findOne({
      attributes: [UserProperty.PASSWORD],
      where: {
        id: userId,
      },
      rejectOnEmpty: true,
    });
    return await compare(password, savedHash.get().password);
  }

  public async findByEmail(email: string): Promise<IUserPreview> {
    const user = await this.UserModel.findOne({
      attributes: userPreviewAttributes,
      where: {
        email,
      },
      rejectOnEmpty: true,
    });
    return user.get();
  }
}
