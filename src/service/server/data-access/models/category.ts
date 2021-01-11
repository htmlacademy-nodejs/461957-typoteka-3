import {DataTypes, Model, ModelCtor, Sequelize} from "sequelize";
import {TableName} from "../constants/table-name";
import {Category} from "../../../../types/category";
import {modelOptions} from "./constants/model-options";

type CategoryCreationAttributes = Omit<Category, `id`>;
export type ICategoryEntity = Model<Category, CategoryCreationAttributes>;
export type ICategoryModel = ModelCtor<ICategoryEntity>;

export const defineCategory = (sequelize: Sequelize): ICategoryModel =>
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
