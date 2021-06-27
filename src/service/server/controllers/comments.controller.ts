import {HttpCode} from "../../../constants";
import {ControllerResponse} from "../../../types/controller-response";
import {CommentsService} from "../data-access/services/comments.service";
import {ArticleId} from "../../../types/article-id";
import {ArticleComment, CommentId} from "../../../types/article-comment";
import {ICommentCreating} from "../../../types/interfaces/comment-creating";
import {ICommentPreview} from "../../../types/interfaces/comment-preview";

export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  public async getCommentsByArticleId(id: ArticleId): Promise<ControllerResponse<ICommentPreview[]>> {
    try {
      const articleComments = await this.commentsService.findByArticleId(id);
      return {payload: articleComments};
    } catch (e) {
      return {status: HttpCode.NOT_FOUND};
    }
  }

  public async deleteCommentById(
    articleId: ArticleId,
    commentId: CommentId,
  ): Promise<ControllerResponse<ArticleComment>> {
    const articleComments = await this.commentsService.drop(articleId, commentId);
    if (!articleComments) {
      return {status: HttpCode.NOT_FOUND};
    }
    return {status: HttpCode.OK};
  }

  public async getComment(articleId: ArticleId, commentId: CommentId): Promise<ControllerResponse<ArticleComment>> {
    try {
      const comment = await this.commentsService.findByArticleIdAndCommentId(articleId, commentId);
      return {payload: comment};
    } catch (e) {
      return {status: HttpCode.NOT_FOUND};
    }
  }

  public async createComment(comment: ICommentCreating): Promise<ControllerResponse<ArticleComment>> {
    try {
      await this.commentsService.create(comment);
      return {status: HttpCode.CREATED};
    } catch (e) {
      return {status: HttpCode.INTERNAL_SERVER_ERROR};
    }
  }
}
