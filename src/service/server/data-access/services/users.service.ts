import {IUserModel} from "../models/user";
import {UserId} from "../../../../types/user-id";
import {UserProperty} from "../constants/property-name";
import {IUserPreview} from "../../../../types/interfaces/user-preview";

export class UsersService {
  constructor(private readonly UserModel: IUserModel) {}

  public async findById(id: UserId): Promise<IUserPreview> {
    const comment = await this.UserModel.findOne({
      attributes: [
        UserProperty.ID,
        [UserProperty.FIRST_NAME, `firstName`],
        [UserProperty.LAST_NAME, `lastName`],
        UserProperty.AVATAR,
      ],
      where: {
        id,
      },
      rejectOnEmpty: true,
    });
    return comment.get();
  }
}
