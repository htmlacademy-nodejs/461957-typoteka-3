import {Logger} from "pino";
import Sequelize, {FindAttributeOptions, Model} from "sequelize";

import {ArticleId} from "../../../../types/article-id";
import {CategoryId} from "../../../../types/category-id";
import {IArticleCreating} from "../../../../types/interfaces/article-creating";
import {IArticlePlain} from "../../../../types/interfaces/article-plain";
import {IArticleTitleAndCommentsCount} from "../../../../types/interfaces/article-title-and-comments-count";
import {IArticleTitleAndDate} from "../../../../types/interfaces/article-title-and-date";
import {ICollection} from "../../../../types/interfaces/collection";
import {IPaginationOptions} from "../../../../types/interfaces/pagination-options";
import {UserId} from "../../../../types/user-id";
import {getLogger} from "../../../logger";
import {TableName} from "../constants/table-name";
import {IArticleModel} from "../models/article";

class ArticlesService {
  private readonly logger: Logger = getLogger(); // TODO: [DI] Move to constructor
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

  public async findTheMostDiscussed({limit}: {limit: number}): Promise<IArticleTitleAndCommentsCount[]> {
    try {
      const attributes: FindAttributeOptions = [
        `title`,
        `id`,
        [Sequelize.fn(`COUNT`, Sequelize.col(`comments.id`)), `commentsCount`],
      ];
      const articles = await this.ArticleModel.findAll<Model<IArticleTitleAndCommentsCount>>({
        attributes,
        include: [
          {
            association: TableName.COMMENTS,
            attributes: [],
            duplicating: false,
          },
        ],
        group: [`Article.id`],
        limit,
        order: [[Sequelize.col(`commentsCount`), `DESC`]],
      });
      return articles
        .map(item => item.get({plain: true}))
        .map(item => ({...item, commentsCount: parseInt(`${item.commentsCount}`, 10)}));
    } catch (e) {
      const errorMessage = `Failed to resolve the most discussed comments`;
      this.logger.error(errorMessage);
      this.logger.error(e);
      return Promise.reject(errorMessage);
    }
  }

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

  public async findByAuthorId({
    limit,
    offset,
    authorId,
  }: IPaginationOptions & {authorId: UserId}): Promise<ICollection<IArticleTitleAndDate>> {
    const attributes: FindAttributeOptions = [`title`, `id`, [`created_date`, `createdDate`]];
    const {rows: articles, count: totalCount} = await this.ArticleModel.findAndCountAll<Model<IArticlePlain>>({
      attributes,
      where: {
        authorId,
      },
      limit: limit ?? undefined,
      offset: offset ?? undefined,
      order: [[`createdDate`, `DESC`]],
    });
    return {
      items: articles.map(item => item.get({plain: true})),
      totalCount,
    };
  }

  public async create({announce, createdDate, fullText, title, categories, authorId}: IArticleCreating): Promise<void> {
    const errorMessage = `Failed to create new article`;
    try {
      const createdArticle = await this.ArticleModel.create({
        createdDate,
        announce,
        fullText,
        title,
        authorId,
      });
      await createdArticle.setCategories(categories.map(item => item.id));
      if (createdArticle) {
        return Promise.resolve();
      }
      this.logger.error(errorMessage);
      return Promise.reject(errorMessage);
    } catch (e) {
      this.logger.error(`${errorMessage},\n${(e as Error).toString()}`);
      return Promise.reject(errorMessage);
    }
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

export {ArticlesService};
