import {DataTypes, HasManyAddAssociationMixin, Model, ModelCtor, Sequelize} from "sequelize";

import {IAnnounce, IArticleId, ICreatedDate, IFullText, ITitle} from "../../../../types/article";
import {CategoryId} from "../../../../types/category-id";
import {IAuthorId} from "../../../../types/interfaces/author-id";
import {TableName} from "../constants/table-name";

import {ICategoryEntity} from "./category";
import {modelOptions} from "./constants/model-options";

type PredefinedArticle = IArticleId & ITitle & ICreatedDate & IAnnounce & IFullText & IAuthorId;
type ArticleCreationAttributes = ITitle & ICreatedDate & IAnnounce & IFullText & IAuthorId;
type IArticleEntity = Model<PredefinedArticle, ArticleCreationAttributes> & {
  setCategories(categoryIds: CategoryId[]): Promise<HasManyAddAssociationMixin<ICategoryEntity, CategoryId[]>>;
};
type IArticleModel = ModelCtor<IArticleEntity>;

const defineArticle = (sequelize: Sequelize): IArticleModel =>
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
      authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      ...modelOptions,
      tableName: TableName.ARTICLES,
    },
  );

export {
  IArticleEntity,
  IArticleModel,
  defineArticle,
};
