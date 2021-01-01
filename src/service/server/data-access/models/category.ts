import {DataTypes, Model, ModelCtor, Sequelize} from "sequelize";
import {TableName} from "../constants/table-name";
import {Category} from "../../../../types/category";

type CategoryCreationAttributes = Omit<Category, `id`>

export const defineCategory = (
  sequelize: Sequelize,
): ModelCtor<Model<Category, CategoryCreationAttributes>> =>
  sequelize.define<Model<Category, CategoryCreationAttributes>>(
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
      timestamps: true,
      paranoid: true,
      tableName: TableName.CATEGORIES,
    },
  );
