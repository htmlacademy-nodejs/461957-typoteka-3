import {DataTypes, Model, ModelCtor, Sequelize} from "sequelize";
import {TableName} from "../constants/table-name";
import {Article} from "../../../../types/article";
import {modelOptions} from "./constants/model-options";
import {NewArticleComment} from "../../../../types/article-comment";

type PredefinedArticle = Omit<Article, `comments` | `category`>;
type ArticleCreationAttributes = Omit<Article, `comments` | `id`> & {comments: NewArticleComment[]};
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
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      ...modelOptions,
      tableName: TableName.ARTICLES,
    },
  );
