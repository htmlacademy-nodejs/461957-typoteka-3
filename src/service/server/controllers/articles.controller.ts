import {HttpCode} from "../../../constants";
import {Article, ICategories, IComments} from "../../../types/article";
import {ControllerResponse} from "../../../types/controller-response";
import {CategoryId} from "../../../types/category-id";
import {IArticleAnnounceAndCommentsCount} from "../../../types/interfaces/article-announce-and-comments-count";
import {ArticlesService} from "../data-access/services/articles.service";
import {CategoriesService} from "../data-access/services/categories.service";
import {CommentsService} from "../data-access/services/comments.service";
import {IArticlePlain} from "../../../types/interfaces/article-plain";
import {ArticleId} from "../../../types/article-id";
import {IPaginationOptions} from "../../../types/interfaces/pagination-options";
import {ICollection} from "../../../types/interfaces/collection";
import {IArticleCreating} from "../../../types/interfaces/article-creating";
import {UserId} from "../../../types/user-id";
import {IArticleTitleAndDate} from "../../../types/interfaces/article-title-and-date";
import {getId} from "../../../shared/get-id";
import {saveImage} from "../data-access/static-managers";
import {mimeTypes} from "../../../shared/constants/mime-types";
import {ICategory} from "../../../types/interfaces/category";

const DEFAULT_LIMIT = 8;
const THE_MOST_DISCUSSED_DEFAULT_LENGTH = 4;
const THE_MOST_DISCUSSED_MAX_LENGTH = 20;

const defaultImageExtension = `jpeg`;

class ArticlesController {
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
      }
      return {
        payload: {
          items: plainArticlesWithCategories,
          totalCount,
        },
      };
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

  public async getArticlesByAuthorId({
    offset = 0,
    limit = DEFAULT_LIMIT,
    authorId,
  }: IPaginationOptions & {authorId: UserId}): Promise<ControllerResponse<ICollection<IArticleTitleAndDate>>> {
    try {
      const {items: articles, totalCount} = await this.articlesService.findByAuthorId({authorId, offset, limit});
      if (articles === null) {
        return {
          payload: {
            items: [],
            totalCount: 0,
          },
        };
      }
      return {payload: {items: articles, totalCount}};
    } catch (e) {
      return {status: HttpCode.INTERNAL_SERVER_ERROR};
    }
  }

  public async getArticlesByCategory({
    offset = 0,
    limit = DEFAULT_LIMIT,
    categoryId,
  }: IPaginationOptions & {categoryId: CategoryId}): Promise<
    ControllerResponse<ICategory & ICollection<IArticlePlain>>
  > {
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

  public async getDiscussed({
    limit = THE_MOST_DISCUSSED_DEFAULT_LENGTH,
  }: {
    limit?: number;
  }): Promise<ControllerResponse<IArticleAnnounceAndCommentsCount[]>> {
    try {
      if (limit > THE_MOST_DISCUSSED_MAX_LENGTH) {
        limit = THE_MOST_DISCUSSED_MAX_LENGTH;
      }
      const articles = await this.articlesService.findTheMostDiscussed({limit});
      return {payload: articles};
    } catch (e) {
      return {status: HttpCode.INTERNAL_SERVER_ERROR};
    }
  }

  public async createNewArticle(newArticle: IArticleCreating): Promise<ControllerResponse<void>> {
    try {
      if (newArticle.pictureContent && newArticle.pictureMimeType) {
        const pictureName = resolvePictureName(newArticle.pictureMimeType);
        await saveImage(pictureName, Buffer.from(newArticle.pictureContent));
        await this.articlesService.create({...newArticle, pictureName});
      } else {
        await this.articlesService.create(newArticle);
      }
      return {status: HttpCode.CREATED};
    } catch (e) {
      return {status: HttpCode.INTERNAL_SERVER_ERROR};
    }
  }

  public async updateArticle(id: ArticleId, article: IArticleCreating): Promise<ControllerResponse<Article>> {
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
}

function resolvePictureName(mimeType: string): string {
  return getId() + `.` + (mimeTypes[mimeType] ?? defaultImageExtension);
}

export {ArticlesController};
