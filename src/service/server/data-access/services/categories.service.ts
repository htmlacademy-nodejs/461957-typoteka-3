import {Model, Op, Sequelize} from "sequelize";
import {ArticleId} from "../../../../types/article-id";
import {Category} from "../../../../types/category";
import {CategoryId} from "../../../../types/category-id";
import {CategoryWithNumbers} from "../../../../types/category-with-numbers";
import {TableName} from "../constants/table-name";

import {ICategoryModel} from "../models/category";

export class CategoriesService {
  constructor(private readonly CategoryModel: ICategoryModel) {}

  public async findAll(): Promise<Category[]> {
    const result = await this.CategoryModel.findAll({
      attributes: [`id`, `label`],
      group: [Sequelize.col(`Category.id`)],
    });
    return result.map(it => it.get());
  }

  public async findAllWithNumbers(): Promise<CategoryWithNumbers[]> {
    const result = await this.CategoryModel.findAll<Model<CategoryWithNumbers>>({
      attributes: [`id`, `label`, [Sequelize.fn(`COUNT`, Sequelize.col(`article_id`)), `count`]],
      group: [Sequelize.col(`Category.id`)],
      include: [
        {
          association: TableName.ARTICLES_CATEGORIES,
          attributes: [],
          where: {
            [`article_id`]: {
              [Op.gt]: 0,
            },
          },
        },
      ],
    });
    return result.map<CategoryWithNumbers>(it => it.get());
  }

  public async findByArticleId(articleId: ArticleId): Promise<Category[]> {
    const result = await this.CategoryModel.findAll({
      attributes: [`id`, `label`],
      include: [
        {
          association: TableName.ARTICLES_CATEGORIES,
          attributes: [],
          where: {
            ArticleId: articleId,
          },
        },
      ],
    });
    return result.map(it => it.get({plain: true}));
  }

  public async findOneById(id: CategoryId): Promise<Category> {
    const category = await this.CategoryModel.findOne({
      attributes: [`id`, `label`],
      where: {
        id,
      },
    });
    return category.get();
  }
}
