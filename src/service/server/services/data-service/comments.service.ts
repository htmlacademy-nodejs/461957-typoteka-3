import {ICommentModel} from "../../data-access/models/comment";
import {ArticleId} from "../../../../types/article-id";
import {ArticleComment, CommentId} from "../../../../types/article-comment";
import {CommentProperty} from "../../data-access/constants/property-name";

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

  public async findByArticleId(articleId: ArticleId): Promise<ArticleComment[]> {
    const comments = await this.CommentsModel.findAll({
      attributes: [CommentProperty.ID, CommentProperty.TEXT],
      where: {
        articleId,
      },
    });
    return comments.map(item => item.get({plain: true}));
  }
}
