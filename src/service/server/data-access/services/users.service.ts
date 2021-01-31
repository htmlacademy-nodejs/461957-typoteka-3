import {IUserModel} from "../models/user";
import {UserId} from "../../../../types/user-id";
import {UserProperty} from "../constants/property-name";
import {IUserPreview} from "../../../../types/interfaces/user-preview";
import {IUserCreating} from "../../../../types/interfaces/user-creating";
import {FindAttributeOptions} from "sequelize";

const userPreviewAttributes: FindAttributeOptions = [
  UserProperty.ID,
  [UserProperty.FIRST_NAME, `firstName`],
  [UserProperty.LAST_NAME, `lastName`],
  UserProperty.AVATAR,
];

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

  public async create({roleId, lastName, firstName, email, avatar}: IUserCreating): Promise<void> {
    const createdUser = await this.UserModel.create({roleId, lastName, firstName, email, avatar});
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
