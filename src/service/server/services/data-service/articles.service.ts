import {IArticleModel} from "../../data-access/models/article";
import {IIntermediateModel} from "../../data-access/models/intermediate";
import {ArticleWithComments, IComments, ICommentsCount, NewArticle} from "../../../../types/article";
import {TableName} from "../../data-access/constants/table-name";
import Sequelize, {FindAttributeOptions, Model} from "sequelize";
import {CategoryId} from "../../../../types/category-id";
import {Includeable} from "sequelize/types/lib/model";
import {CommentProperty} from "../../data-access/constants/property-name";

interface NestedCategory {
  categoriesIds: CategoryId[];
}

type Override<T extends NewArticle, T2> = Omit<T, keyof T2> & T2;

export class ArticlesService {
  constructor(
    private readonly ArticleModel: IArticleModel,
    private readonly ArticleCategoryModel: IIntermediateModel,
  ) {}

  public async findAll(areCommentsRequired: false): Promise<NewArticle[]>;
  public async findAll(areCommentsRequired: true): Promise<ArticleWithComments[]>;
  public async findAll(areCommentsRequired: boolean): Promise<ArticleWithComments[] | NewArticle[]> {
    const include: Record<string, Includeable> = {
      categories: {
        association: TableName.CATEGORIES,
        attributes: [],
        through: {
          attributes: [],
        },
      },
      commentsForCount: {
        association: TableName.COMMENTS,
        attributes: [],
      },
      comments: {
        association: TableName.COMMENTS,
        attributes: [
          CommentProperty.ID,
          [CommentProperty.ARTICLEID, `articleId`],
          CommentProperty.TEXT,
          [CommentProperty.CREATEDDATE, `createdDate`],
        ],
      },
    };
    const attributes: FindAttributeOptions = [
      `announce`,
      [`full_text`, `fullText`],
      `title`,
      `id`,
      [`created_date`, `createdDate`],
      [Sequelize.fn(`COUNT`, `comments.id`), `commentsCount`],
      [Sequelize.literal(`ARRAY_AGG(comments.id)`), `commentIds`],
      // [Sequelize.literal(`ARRAY_AGG(categories.id)`), `categoriesIds`],
    ];
    // if (areCommentsRequired) {
    //   const articles = await this.ArticleModel.findAll<
    //     Model<Override<NewArticle & IComments & ICommentsCount, NestedCategory>>
    //   >({
    //     attributes,
    //     include: [include.categories, include.comments],
    //     group: [`Article.id`],
    //   });
    //   return articles.map(item => item.get({plain: true})).map(item => ({...item, categories: item.categoriesIds}));
    // } else {
    const articles = await this.ArticleModel.findAll<
      Model<Override<NewArticle & IComments & ICommentsCount, NestedCategory>>
    >({
      attributes,
      include: [include.categories, include.commentsForCount],
      group: [`Article.id`],
    });
    return articles.map(item => item.get({plain: true})).map(item => ({...item}));
    // }
  }

  // public async findPage({limit, offset}: {limit: number; offset: number}): Promise<Article[]> {}
  // public async findOne(areCommentsRequired: boolean): Promise<Article> {}
  // public async drop(id: ArticleId): Promise<void> {}
  // public async create(): Promise<Article[]> {}
  // public async update(): Promise<void> {}
}
