import {DataTypes, Model, ModelCtor, Sequelize} from "sequelize";
import {TableName} from "../constants/table-name";
import {Article} from "../../../../types/article";

type ArticleCreationAttributes = Omit<Article, `id`>;
type PredefinedArticle = Omit<Article, `comments`|`category`>;

export const articleFabric = (sequelize: Sequelize): ModelCtor<Model<PredefinedArticle, ArticleCreationAttributes>> =>
  sequelize.define<Model<PredefinedArticle, ArticleCreationAttributes>>(
    `Article`,
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      announce: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fullText: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      tableName: TableName.ARTICLES,
    },
  );
