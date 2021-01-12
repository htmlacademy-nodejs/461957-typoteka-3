import {DataTypes, Model, ModelCtor, Sequelize} from "sequelize";
import {TableName} from "../constants/table-name";
import {Article} from "../../../../types/article";
import {modelOptions} from "./constants/model-options";

type PredefinedArticle = Omit<Article, `comments` | `category`>;
type ArticleCreationAttributes = Omit<Article, `id`>;
export type IArticleEntity = Model<PredefinedArticle, ArticleCreationAttributes>;
export type IArticleModel = ModelCtor<IArticleEntity>;

export const defineArticle = (sequelize: Sequelize): IArticleModel =>
  sequelize.define<IArticleEntity>(
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
      ...modelOptions,
      tableName: TableName.ARTICLES,
    },
  );
