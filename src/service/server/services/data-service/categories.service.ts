import {Sequelize} from "sequelize";
import {ICategoryModel} from "../../data-access/models/category";
import {Category} from "../../../../types/category";

export class CategoriesService {
  constructor(private readonly CategoryModel: ICategoryModel) {}

  public async findAll(): Promise<Category[]> {
    const result = await this.CategoryModel.findAll({
      attributes: [`id`, `label`],
      group: [Sequelize.col(`Category.id`)],
    });
    return result.map(it => it.get());
  }
}
