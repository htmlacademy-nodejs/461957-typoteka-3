import {HttpCode} from "../../../constants-es6";
import {ArticleComment, CommentId} from "../../../types/article-comment";
import {Article, ICategories, IComments, NewArticle} from "../../../types/article";
import {ControllerResponse} from "../../../types/controller-response";
import {ArticlesByCategory} from "../../../types/articles-by-category";
import {CategoryId} from "../../../types/category-id";
import {ArticlesService} from "../services/data-service/articles.service";
import {CategoriesService} from "../services/data-service/categories.service";
import {CommentsService} from "../services/data-service/comments.service";
import {IArticlePlain} from "../../../types/interfaces/article-plain";
import {ArticleId} from "../../../types/article-id";

interface IGetArticlesProps {
  offset: number;
  limit: number;
  areCommentsRequired: boolean;
}

const DEFAULT_LIMIT = 8;

export class ArticlesController {
  constructor(
    private readonly articlesService: ArticlesService,
    private readonly categoriesService: CategoriesService,
    private readonly commentsService: CommentsService,
  ) {}

  public async getArticles({}: IGetArticlesProps & {areCommentsRequired: false}): Promise<
    ControllerResponse<(IArticlePlain & ICategories)[]>
  >;
  public async getArticles({}: IGetArticlesProps & {areCommentsRequired: true}): Promise<
    ControllerResponse<(IArticlePlain & ICategories & IComments)[]>
  >;
  public async getArticles({
    offset = 0,
    limit = DEFAULT_LIMIT,
    areCommentsRequired,
  }: IGetArticlesProps): Promise<
    ControllerResponse<(IArticlePlain & ICategories)[] | (IArticlePlain & ICategories & IComments)[]>
  > {
    try {
      const plainArticles = await this.articlesService.findAll({limit, offset});
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
        return {payload: articlesWithComments};
      } else {
        return {payload: plainArticlesWithCategories};
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

  public async getArticlesByCategory(categoryId: CategoryId): Promise<ControllerResponse<ArticlesByCategory>> {
    const [plainArticles, category] = await Promise.all([
      this.articlesService.findByCategoryId(categoryId),
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
        articles: plainArticlesWithCategories,
        category,
        itemsCount: plainArticlesWithCategories.length,
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

  public async createNewArticle(newArticle: NewArticle): Promise<ControllerResponse<true | null>> {
    const savedArticle = await this.articlesService.create(newArticle);
    if (savedArticle === null) {
      return {status: HttpCode.INTERNAL_SERVER_ERROR};
    }
    return {status: HttpCode.CREATED, payload: savedArticle};
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
