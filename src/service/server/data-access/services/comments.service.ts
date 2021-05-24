import {ICommentModel} from "../models/comment";
import {ArticleId} from "../../../../types/article-id";
import {ArticleComment, CommentId} from "../../../../types/article-comment";
import {CommentProperty} from "../constants/property-name";
import {ICommentCreating} from "../../../../types/interfaces/comment-creating";
import {Logger} from "pino";
import {getLogger} from "../../../logger";

export class CommentsService {
  private readonly logger: Logger = getLogger(); // TODO: [DI] Move to constructor
  constructor(private readonly CommentsModel: ICommentModel) {}

  public async findById(id: CommentId): Promise<ArticleComment> {
    const comment = await this.CommentsModel.findOne({
      attributes: [CommentProperty.ID, CommentProperty.TEXT],
      where: {
        id,
      },
    });
    return comment.get();
  }

  public async findByArticleIdAndCommentId(articleId: ArticleId, commentId: CommentId): Promise<ArticleComment> {
    const comment = await this.CommentsModel.findOne({
      attributes: [CommentProperty.ID, CommentProperty.TEXT],
      where: {
        id: commentId,
        articleId,
      },
      rejectOnEmpty: true,
    });
    return comment.get();
  }

  public async findByArticleId(articleId: ArticleId): Promise<ArticleComment[]> {
    const comments = await this.CommentsModel.findAll({
      attributes: [
        CommentProperty.ID,
        CommentProperty.TEXT,
        [CommentProperty.CREATEDDATE, `createdDate`],
        [CommentProperty.ARTICLEID, `articleId`],
      ],
      where: {
        articleId,
      },
      order: [[`createdDate`, `ASC`]],
    });
    return comments.map(item => item.get({plain: true}));
  }

  public async create({articleId, text, createdDate, authorId}: ICommentCreating): Promise<void> {
    try {
      const comment = await this.CommentsModel.create({
        articleId,
        createdDate,
        text,
        authorId,
      });
      if (comment.get()) {
        return Promise.resolve();
      }
      this.logger.error(`Failed to create comment`);
      return Promise.reject(`Failed to create comment`);
    } catch (e) {
      this.logger.error(`Failed to create comment, ${(e as Error).toString()}`);
      return Promise.reject(`Failed to create comment, ${(e as Error).toString()}`);
    }
  }

  public async drop(articleId: ArticleId, commentId: CommentId): Promise<boolean> {
    const deletedComment = await this.CommentsModel.destroy({
      where: {
        articleId,
        id: commentId,
      },
    });
    return !!deletedComment;
  }
}
