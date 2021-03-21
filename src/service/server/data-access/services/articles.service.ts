import {IArticleModel} from "../models/article";
import {TableName} from "../constants/table-name";
import Sequelize, {FindAttributeOptions, Model} from "sequelize";
import {CategoryId} from "../../../../types/category-id";
import {ArticleId} from "../../../../types/article-id";
import {IArticlePlain} from "../../../../types/interfaces/article-plain";
import {IPaginationOptions} from "../../../../types/interfaces/pagination-options";
import {ICollection} from "../../../../types/interfaces/collection";
import {IArticleCreating} from "../../../../types/interfaces/article-creating";

export class ArticlesService {
  constructor(private readonly ArticleModel: IArticleModel) {}

  public async findAll({limit, offset}: IPaginationOptions): Promise<ICollection<IArticlePlain>> {
    const attributes: FindAttributeOptions = [
      `announce`,
      [`full_text`, `fullText`],
      `title`,
      `id`,
      [`created_date`, `createdDate`],
      [Sequelize.fn(`COUNT`, Sequelize.col(`comments.id`)), `commentsCount`],
    ];
    const articles = await this.ArticleModel.findAll<Model<IArticlePlain>>({
      attributes,
      include: [
        {
          association: TableName.COMMENTS,
          attributes: [],
          duplicating: false,
        },
      ],
      group: [`Article.id`],
      limit: limit ?? undefined,
      offset: offset ?? undefined,
      order: [[`createdDate`, `DESC`]],
    });
    const count = await this.ArticleModel.count();
    return {
      items: articles
        .map(item => item.get({plain: true}))
        .map(item => ({...item, commentsCount: parseInt(`${item.commentsCount}`, 10)})),
      totalCount: count,
    };
  }

  // public async findPage({limit, offset}: {limit: number; offset: number}): Promise<Article[]> {}

  public async findOneById(articleId: ArticleId): Promise<IArticlePlain> {
    const attributes: FindAttributeOptions = [
      `announce`,
      [`full_text`, `fullText`],
      `title`,
      `id`,
      [`created_date`, `createdDate`],
      [Sequelize.fn(`COUNT`, Sequelize.col(`comments.id`)), `commentsCount`],
    ];
    const article = await this.ArticleModel.findOne<Model<IArticlePlain>>({
      attributes,
      include: [
        {
          association: TableName.COMMENTS,
          attributes: [],
        },
      ],
      group: [`Article.id`],
      where: {
        id: articleId,
      },
      rejectOnEmpty: true,
    });
    const plainArticle = article.get({plain: true});
    return {...plainArticle, commentsCount: parseInt(`${plainArticle.commentsCount}`, 10)};
  }

  public async findByCategoryId({
    limit,
    offset,
    categoryId,
  }: IPaginationOptions & {categoryId: CategoryId}): Promise<ICollection<IArticlePlain>> {
    const attributes: FindAttributeOptions = [
      `announce`,
      [`full_text`, `fullText`],
      `title`,
      `id`,
      [`created_date`, `createdDate`],
      [Sequelize.fn(`COUNT`, Sequelize.col(`comments.id`)), `commentsCount`],
    ];
    const articles = await this.ArticleModel.findAll<Model<IArticlePlain>>({
      attributes,
      include: [
        {
          association: TableName.COMMENTS,
          attributes: [],
          duplicating: false,
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
          duplicating: false,
        },
      ],
      group: [`Article.id`],
      limit: limit ?? undefined,
      offset: offset ?? undefined,
      order: [[`createdDate`, `DESC`]],
    });
    const count = await this.ArticleModel.count({
      attributes: [[Sequelize.fn(`COUNT`, Sequelize.col(`categories.id`)), `count`]],
      include: {
        association: TableName.CATEGORIES,
        attributes: [],
        through: {
          attributes: [],
        },
        where: {
          id: categoryId,
        },
      },
    });
    const preparedArticles = articles
      .map(item => item.get({plain: true}))
      .map(item => ({...item, commentsCount: parseInt(`${item.commentsCount}`, 10)}));
    return {
      totalCount: count,
      items: preparedArticles,
    };
  }

  public async create({announce, createdDate, fullText, title, categories}: IArticleCreating): Promise<void> {
    const createdArticle = await this.ArticleModel.create({
      createdDate,
      announce,
      fullText,
      title,
    });
    await createdArticle.setCategories(categories.map(item => item.id));
    return createdArticle ? Promise.resolve() : Promise.reject(`Failed to create new article`);
  }

  public async drop(id: ArticleId): Promise<boolean> {
    const deletedArticle = await this.ArticleModel.destroy({
      where: {
        id,
      },
      cascade: true,
    });
    return !!deletedArticle;
  }

  public async update(
    id: ArticleId,
    {announce, createdDate, fullText, title, categories}: IArticleCreating,
  ): Promise<boolean> {
    try {
      await this.ArticleModel.update(
        {
          createdDate,
          announce,
          fullText,
          title,
        },
        {
          where: {
            id,
          },
        },
      );
      const updatedArticle = await this.ArticleModel.findOne({
        where: {
          id,
        },
        rejectOnEmpty: true,
      });
      await updatedArticle.setCategories(categories.map(item => item.id));
      return !!updatedArticle;
    } catch (e) {
      return Promise.reject(`Not found`);
    }
  }
}
