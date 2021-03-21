import {IUserModel} from "../models/user";
import {ILogin} from "../../../../types/interfaces/login";
import {ILoginResult} from "../../../../types/interfaces/login-result";
import {IUserPreview} from "../../../../types/interfaces/user-preview";
import {LoginStatus} from "../../../../constants-es6";
import {UserId} from "../../../../types/user-id";
import {UserProperty} from "../constants/property-name";
import {compare} from "bcrypt";
import {FindAttributeOptions} from "sequelize";

const userPreviewAttributes: FindAttributeOptions = [
  UserProperty.ID,
  [UserProperty.FIRST_NAME, `firstName`],
  [UserProperty.LAST_NAME, `lastName`],
  UserProperty.AVATAR,
];

export class AuthService {
  constructor(private readonly UserModel: IUserModel) {}

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

  private async findByEmail(email: string): Promise<IUserPreview> {
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
