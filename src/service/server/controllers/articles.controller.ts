import {HttpCode} from "../../../constants-es6";
import {ArticleComment, CommentId} from "../../../types/article-comment";
import {Article, ICategories, IComments, NewArticle} from "../../../types/article";
import {ControllerResponse} from "../../../types/controller-response";
import {ArticlesByCategory} from "../../../types/articles-by-category";
import {CategoryId} from "../../../types/category-id";
import {ArticlesService} from "../data-access/services/articles.service";
import {CategoriesService} from "../data-access/services/categories.service";
import {CommentsService} from "../data-access/services/comments.service";
import {IArticlePlain} from "../../../types/interfaces/article-plain";
import {ArticleId} from "../../../types/article-id";
import {IPaginationOptions} from "../../../types/interfaces/pagination-options";
import {ICollection} from "../../../types/interfaces/collection";
import {IArticleCreating} from "../../../types/interfaces/article-creating";

const DEFAULT_LIMIT = 8;

export class ArticlesController {
  constructor(
    private readonly articlesService: ArticlesService,
    private readonly categoriesService: CategoriesService,
    private readonly commentsService: CommentsService,
  ) {}

  public async getArticles({}: IPaginationOptions & {areCommentsRequired: false}): Promise<
    ControllerResponse<ICollection<IArticlePlain & ICategories>>
  >;
  public async getArticles({}: IPaginationOptions & {areCommentsRequired: true}): Promise<
    ControllerResponse<ICollection<IArticlePlain & ICategories & IComments>>
  >;
  public async getArticles({
    offset = 0,
    limit = DEFAULT_LIMIT,
    areCommentsRequired,
  }: IPaginationOptions & {areCommentsRequired: boolean}): Promise<
    ControllerResponse<ICollection<IArticlePlain & ICategories> | ICollection<IArticlePlain & ICategories & IComments>>
  > {
    try {
      const {items: plainArticles, totalCount} = await this.articlesService.findAll({limit, offset});
      if (plainArticles === null) {
        return {status: HttpCode.INTERNAL_SERVER_ERROR};
      }
      const plainArticlesWithCategories = await Promise.all(
        plainArticles.map(async article => ({
          ...article,
          categories: await this.categoriesService.findByArticleId(article.id),
        })),
      );
      if (areCommentsRequired) {
        const articlesWithComments = await Promise.all(
          plainArticlesWithCategories.map(async article => ({
            ...article,
            comments: await this.commentsService.findByArticleId(article.id),
          })),
        );
        return {
          payload: {
            items: articlesWithComments,
            totalCount,
          },
        };
      } else {
        return {
          payload: {
            items: plainArticlesWithCategories,
            totalCount,
          },
        };
      }
    } catch (e) {
      return {status: HttpCode.INTERNAL_SERVER_ERROR};
    }
  }

  public async getArticleById(id: ArticleId): Promise<ControllerResponse<Article>> {
    try {
      const [plainArticle, categories, comments] = await Promise.all([
        this.articlesService.findOneById(id),
        this.categoriesService.findByArticleId(id),
        this.commentsService.findByArticleId(id),
      ]);
      return {payload: {...plainArticle, categories, comments}};
    } catch (e) {
      return {status: HttpCode.NOT_FOUND};
    }
  }

  public async getArticlesByCategory({
    offset = 0,
    limit = DEFAULT_LIMIT,
    categoryId,
  }: IPaginationOptions & {categoryId: CategoryId}): Promise<ControllerResponse<ArticlesByCategory>> {
    const [{items: plainArticles, totalCount}, category] = await Promise.all([
      this.articlesService.findByCategoryId({offset, limit, categoryId}),
      this.categoriesService.findOneById(categoryId),
    ]);
    if (plainArticles === null) {
      return {status: HttpCode.INTERNAL_SERVER_ERROR};
    }
    const plainArticlesWithCategories = await Promise.all(
      plainArticles.map(async article => ({
        ...article,
        categories: await this.categoriesService.findByArticleId(article.id),
      })),
    );
    return {
      payload: {
        items: plainArticlesWithCategories,
        category,
        totalCount,
      },
    };
  }

  public async getCommentsByArticleId(id: ArticleId): Promise<ControllerResponse<ArticleComment[]>> {
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

  public async createNewArticle(newArticle: IArticleCreating): Promise<ControllerResponse<void>> {
    try {
      await this.articlesService.create(newArticle);
      return {status: HttpCode.CREATED};
    } catch (e) {
      return {status: HttpCode.INTERNAL_SERVER_ERROR};
    }
  }

  public async updateArticle(id: ArticleId, article: NewArticle): Promise<ControllerResponse<Article>> {
    try {
      const isSuccess = await this.articlesService.update(id, article);
      if (!isSuccess) {
        return {status: HttpCode.NOT_FOUND};
      }
      return {status: HttpCode.OK};
    } catch (e) {
      return {status: HttpCode.NOT_FOUND};
    }
  }

  public async deleteArticle(id: ArticleId): Promise<ControllerResponse<Article>> {
    const isSuccess = await this.articlesService.drop(id);
    if (!isSuccess) {
      return {status: HttpCode.NOT_FOUND};
    }
    return {status: HttpCode.OK};
  }

  public async createComment(articleId: ArticleId, commentText: string): Promise<ControllerResponse<ArticleComment>> {
    const savedComment = await this.commentsService.create(articleId, commentText);
    if (savedComment === null) {
      return {status: HttpCode.INTERNAL_SERVER_ERROR};
    }
    return {status: HttpCode.CREATED, payload: savedComment};
  }
}
