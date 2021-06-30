import {UsersService} from "../data-access/services/users.service";
import {UserId} from "../../../types/user-id";
import {HttpCode} from "../../../constants";
import {ControllerResponse} from "../../../types/controller-response";
import {IUserPreview} from "../../../types/interfaces/user-preview";
import {IUserCreating} from "../../../types/interfaces/user-creating";
import {ValidationResponse} from "../../../types/validation-response";
import {verifyAccessToken} from "../auth/verify-access-token";
import {CommentsService} from "../data-access/services/comments.service";
import {IAuthorsComment} from "../../../types/interfaces/authors-comment";

class UsersController {
  constructor(private readonly usersService: UsersService, private readonly commentsService: CommentsService) {}

  public async getOne(userId: UserId): Promise<ControllerResponse<IUserPreview>> {
    try {
      const user = await this.usersService.findById(userId);
      return {payload: user};
    } catch (e) {
      return {status: HttpCode.NOT_FOUND};
    }
  }

  public async create(newUser: IUserCreating): Promise<ControllerResponse<void | ValidationResponse<IUserCreating>>> {
    try {
      const isEmailFree = await this.checkIfEmailIsFree(newUser.email);
      if (isEmailFree) {
        await this.usersService.create(newUser);
        return {status: HttpCode.CREATED};
      }
      return {status: HttpCode.BAD_REQUEST, payload: {email: `Пользователь с таким email уже зарегистрирован`}};
    } catch (e) {
      return {status: HttpCode.INTERNAL_SERVER_ERROR};
    }
  }

  public async getAuthorsComments(authToken: string): Promise<ControllerResponse<IAuthorsComment[]>> {
    try {
      const {id: authorId} = await verifyAccessToken(authToken);
      const comments = await this.commentsService.findByAuthorId(authorId);
      return {payload: comments};
    } catch (e) {
      return {status: HttpCode.INTERNAL_SERVER_ERROR};
    }
  }

  private async checkIfEmailIsFree(email: string): Promise<boolean> {
    try {
      await this.usersService.findByEmail(email);
      return false;
    } catch (e) {
      return true;
    }
  }
}

export {
  UsersController,
};
