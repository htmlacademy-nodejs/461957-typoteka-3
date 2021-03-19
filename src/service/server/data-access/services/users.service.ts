import {IUserModel} from "../models/user";
import {UserId} from "../../../../types/user-id";
import {UserProperty} from "../constants/property-name";
import {IUserPreview} from "../../../../types/interfaces/user-preview";
import {IUserCreating} from "../../../../types/interfaces/user-creating";
import {FindAttributeOptions} from "sequelize";
import {compare, hash} from "bcrypt";
import {ILoginResult} from "../../../../types/interfaces/login-result";
import {LoginStatus} from "../../../../constants-es6";
import {ILogin} from "../../../../types/interfaces/login";

const userPreviewAttributes: FindAttributeOptions = [
  UserProperty.ID,
  [UserProperty.FIRST_NAME, `firstName`],
  [UserProperty.LAST_NAME, `lastName`],
  UserProperty.AVATAR,
];

const SALT_ROUNDS = 10;

export class UsersService {
  constructor(private readonly UserModel: IUserModel) {}

  public async findById(id: UserId): Promise<IUserPreview> {
    const user = await this.UserModel.findOne({
      attributes: userPreviewAttributes,
      where: {
        id,
      },
      rejectOnEmpty: true,
    });
    return user.get();
  }

  public async create({roleId, lastName, firstName, email, avatar, password}: IUserCreating): Promise<void> {
    const passwordsHash = await hash(password, SALT_ROUNDS);
    const createdUser = await this.UserModel.create({
      roleId,
      lastName,
      firstName,
      email,
      avatar,
      password: passwordsHash,
    });
    return createdUser ? Promise.resolve() : Promise.reject(`Failed to create new user`);
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

  public async checkPassword({userId, password}: {userId: UserId; password: string}): Promise<boolean> {
    const savedHash = await this.UserModel.findOne({
      attributes: [UserProperty.PASSWORD],
      where: {
        id: userId,
      },
      rejectOnEmpty: true,
    });
    return await compare(password, savedHash.get().password);
  }
}
