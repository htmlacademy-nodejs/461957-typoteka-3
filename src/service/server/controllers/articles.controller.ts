import {DataProviderService} from "../services/data-provider.service";
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
import {getNumericalId} from "../../../shared/get-id";

export class ArticlesController {
  constructor(
    private readonly articlesService: ArticlesService,
    private readonly categoriesService: CategoriesService,
    private readonly commentsService: CommentsService,
    private dataProvider: DataProviderService,
  ) {}

  public async getArticles(areCommentsRequired: false): Promise<ControllerResponse<(IArticlePlain & ICategories)[]>>;
  public async getArticles(
    areCommentsRequired: true,
  ): Promise<ControllerResponse<(IArticlePlain & ICategories & IComments)[]>>;
  public async getArticles(
    areCommentsRequired: boolean,
  ): Promise<ControllerResponse<(IArticlePlain & ICategories)[] | (IArticlePlain & ICategories & IComments)[]>> {
    const plainArticles = await this.articlesService.findAll();
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
  }

  public async getArticleById(id: ArticleId): Promise<ControllerResponse<Article>> {
    const [plainArticle, categories, comments] = await Promise.all([
      this.articlesService.findOneById(id),
      this.categoriesService.findByArticleId(id),
      this.commentsService.findByArticleId(id),
    ]);
    if (plainArticle === null) {
      return {status: HttpCode.NOT_FOUND};
    }

    return {payload: {...plainArticle, categories, comments}};
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
    const articleComments = await this.commentsService.findByArticleId(id);
    if (articleComments === null) {
      return {status: HttpCode.NOT_FOUND};
    }
    return {payload: articleComments};
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

  public async getByArticleIdAndCommentId(
    articleId: ArticleId,
    commentId: CommentId,
  ): Promise<ControllerResponse<ArticleComment>> {
    const comment = await this.commentsService.findByArticleIdAndCommentId(articleId, commentId);
    if (comment === null) {
      return {status: HttpCode.NOT_FOUND};
    }
    return {payload: comment};
  }

  public async createNewArticle(newArticle: NewArticle): Promise<ControllerResponse<Article>> {
    const article: Article = {...newArticle, id: getNumericalId(), comments: []};
    const savedArticle = await this.dataProvider.createNewArticle(article);
    if (savedArticle === null) {
      return {status: HttpCode.INTERNAL_SERVER_ERROR};
    }
    return {status: HttpCode.CREATED, payload: savedArticle};
  }

  public async updateArticle(id: ArticleId, article: Article): Promise<ControllerResponse<Article>> {
    const updatedArticle = await this.dataProvider.updateArticle(id, article);
    if (updatedArticle === null) {
      return {status: HttpCode.NOT_FOUND};
    }
    return {payload: updatedArticle};
  }

  public async deleteArticle(id: ArticleId): Promise<ControllerResponse<Article>> {
    const deletedArticle = await this.dataProvider.deleteArticle(id);
    if (deletedArticle === null) {
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
