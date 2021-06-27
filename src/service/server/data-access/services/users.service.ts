import {hash} from "bcrypt";
import {FindAttributeOptions} from "sequelize";

import {IUserCreating} from "../../../../types/interfaces/user-creating";
import {IUserPreview} from "../../../../types/interfaces/user-preview";
import {UserId} from "../../../../types/user-id";
import {UserProperty} from "../constants/property-name";
import {IUserModel} from "../models/user";

const userPreviewAttributes: FindAttributeOptions = [
  UserProperty.ID,
  [UserProperty.FIRST_NAME, `firstName`],
  [UserProperty.LAST_NAME, `lastName`],
  [UserProperty.ROLE_ID, `roleId`],
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
}
