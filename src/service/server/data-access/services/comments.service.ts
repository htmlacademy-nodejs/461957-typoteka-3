import {ICommentModel} from "../models/comment";
import {ArticleId} from "../../../../types/article-id";
import {ArticleComment, CommentId} from "../../../../types/article-comment";
import {CommentProperty} from "../constants/property-name";

export class CommentsService {
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
      attributes: [CommentProperty.ID, CommentProperty.TEXT],
      where: {
        articleId,
      },
    });
    return comments.map(item => item.get({plain: true}));
  }

  public async create(articleId: ArticleId, text: string): Promise<ArticleComment> {
    const comment = await this.CommentsModel.create({
      articleId,
      createdDate: new Date(),
      text,
    });
    return comment.get();
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
