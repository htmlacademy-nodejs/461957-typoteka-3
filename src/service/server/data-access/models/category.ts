import {DataTypes, Model, ModelCtor, Sequelize} from "sequelize";
import {TableName} from "../constants/table-name";

interface CategoryAttributes extends CategoryCreationAttributes {
  id: number;
}

interface CategoryCreationAttributes {
  label: string;
}

export const categoryFabric = (
  sequelize: Sequelize,
): ModelCtor<Model<CategoryAttributes, CategoryCreationAttributes>> =>
  sequelize.define<Model<CategoryAttributes, CategoryCreationAttributes>>(
    `Category`,
    {
      id: {
        type: DataTypes.NUMBER,
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
