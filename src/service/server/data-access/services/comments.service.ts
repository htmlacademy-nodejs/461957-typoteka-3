import {ICommentModel} from "../models/comment";
import {ArticleId} from "../../../../types/article-id";
import {ArticleComment, CommentId} from "../../../../types/article-comment";
import {CommentProperty, UserProperty} from "../constants/property-name";
import {ICommentCreating} from "../../../../types/interfaces/comment-creating";
import {Logger} from "pino";
import {getLogger} from "../../../logger";
import {FindAttributeOptions, Model} from "sequelize";
import {ICommentPreview} from "../../../../types/interfaces/comment-preview";
import {TableName} from "../constants/table-name";
import {IUserPreview} from "../../../../types/interfaces/user-preview";

const commentPreviewAttributes: FindAttributeOptions = [
  CommentProperty.ID,
  CommentProperty.TEXT,
  [CommentProperty.CREATEDDATE, `createdDate`],
  [CommentProperty.ARTICLEID, `articleId`],
  [CommentProperty.AUTHORID, `authorId`],
];
const userPreviewAttributes: FindAttributeOptions = [
  [UserProperty.FIRST_NAME, `firstName`],
  [UserProperty.LAST_NAME, `lastName`],
  UserProperty.AVATAR,
];

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

  public async findByArticleId(articleId: ArticleId): Promise<ICommentPreview[]> {
    try {
      const comments = await this.CommentsModel.findAll<Model<ICommentPreview>>({
        attributes: commentPreviewAttributes,
        where: {
          articleId,
        },
        include: [
          {
            association: TableName.USERS,
            attributes: userPreviewAttributes,
          },
        ],
        order: [[`createdDate`, `ASC`]],
      });
      return comments
        .map<ICommentPreview>(item => item.get({plain: true}))
        .map((item: ICommentPreview & {users: IUserPreview}) => ({
          id: item.id,
          text: item.text,
          user: item.users,
          createdDate: item.createdDate,
          articleId: item.articleId,
          authorId: item.authorId,
        }));
    } catch (e) {
      this.logger.error(`Failed to find comments, ${(e as Error).toString()}`);
      return Promise.reject(`Failed to find comments, ${(e as Error).toString()}`);
    }
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
