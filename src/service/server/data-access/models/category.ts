import {DataTypes, Model, ModelCtor, Sequelize} from "sequelize";

import {Category} from "../../../../types/category";
import {TableName} from "../constants/table-name";

import {modelOptions} from "./constants/model-options";

type CategoryCreationAttributes = Omit<Category, `id`>;
type ICategoryEntity = Model<Category, CategoryCreationAttributes>;
type ICategoryModel = ModelCtor<ICategoryEntity>;

const defineCategory = (sequelize: Sequelize): ICategoryModel =>
  sequelize.define<ICategoryEntity>(
    `Category`,
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      label: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      ...modelOptions,
      tableName: TableName.CATEGORIES,
    },
  );

export {
  ICategoryEntity,
  ICategoryModel,
  defineCategory,
};
