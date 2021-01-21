import {IArticleModel} from "../../data-access/models/article";
import {IIntermediateModel} from "../../data-access/models/intermediate";
import {IAnnounce, IArticleId, ICommentsCount, ICreatedDate, IFullText, ITitle} from "../../../../types/article";
import {TableName} from "../../data-access/constants/table-name";
import Sequelize, {FindAttributeOptions, Model} from "sequelize";
import {CategoryId} from "../../../../types/category-id";

type PlainArticle = IAnnounce & IFullText & ITitle & IArticleId & ICreatedDate & ICommentsCount;

export class ArticlesService {
  constructor(
    private readonly ArticleModel: IArticleModel,
    private readonly ArticleCategoryModel: IIntermediateModel,
  ) {}

  public async findAll(): Promise<PlainArticle[]> {
    const attributes: FindAttributeOptions = [
      `announce`,
      [`full_text`, `fullText`],
      `title`,
      `id`,
      [`created_date`, `createdDate`],
      [Sequelize.fn(`COUNT`, Sequelize.col(`comments.id`)), `commentsCount`],
    ];
    const articles = await this.ArticleModel.findAll<Model<PlainArticle>>({
      attributes,
      include: [
        {
          association: TableName.COMMENTS,
          attributes: [],
        },
      ],
      group: [`Article.id`],
    });
    return articles
      .map(item => item.get({plain: true}))
      .map(item => ({...item, commentsCount: parseInt(`${item.commentsCount}`, 10)}));
  }

  // public async findPage({limit, offset}: {limit: number; offset: number}): Promise<Article[]> {}
  // public async findOne(areCommentsRequired: boolean): Promise<Article> {}

  public async findByCategoryId(categoryId: CategoryId): Promise<PlainArticle[]> {
    const attributes: FindAttributeOptions = [
      `announce`,
      [`full_text`, `fullText`],
      `title`,
      `id`,
      [`created_date`, `createdDate`],
      [Sequelize.fn(`COUNT`, Sequelize.col(`comments.id`)), `commentsCount`],
    ];
    const articles = await this.ArticleModel.findAll<Model<PlainArticle>>({
      attributes,
      include: [
        {
          association: TableName.COMMENTS,
          attributes: [],
        },
        {
          association: TableName.CATEGORIES,
          attributes: [],
          through: {
            attributes: [],
          },
          where: {
            id: categoryId,
          },
        },
      ],
      group: [`Article.id`],
    });
    return articles
      .map(item => item.get({plain: true}))
      .map(item => ({...item, commentsCount: parseInt(`${item.commentsCount}`, 10)}));
  }

  // public async drop(id: ArticleId): Promise<void> {}
  // public async create(): Promise<Article[]> {}
  // public async update(): Promise<void> {}
}
