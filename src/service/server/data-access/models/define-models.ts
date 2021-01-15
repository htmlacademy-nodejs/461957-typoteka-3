import {Sequelize} from "sequelize";
import {defineCategory, ICategoryModel} from "./category";
import {defineArticle, IArticleModel} from "./article";
import {defineComment, ICommentModel} from "./comment";
import {defineIntermediateModel, IIntermediateModel} from "./intermediate";
import {TableName} from "../constants/table-name";
import {ArticleCategoryProperty, ArticleProperty, CommentProperty} from "../constants/property-name";

export interface DatabaseModels {
  CategoryModel: ICategoryModel;
  ArticleModel: IArticleModel;
  CommentModel: ICommentModel;
  ArticleCategoryModel: IIntermediateModel;
}

export function defineDatabaseModels(connection: Sequelize): DatabaseModels {
  const CategoryModel = defineCategory(connection);
  const ArticleModel = defineArticle(connection);
  const CommentModel = defineComment(connection);
  const ArticleCategoryModel = defineIntermediateModel(connection, TableName.ARTICLES_CATEGORIES);

  ArticleModel.hasMany(CommentModel, {as: ArticleProperty.COMMENTS, foreignKey: CommentProperty.ARTICLEID});
  CommentModel.belongsTo(ArticleModel, {foreignKey: CommentProperty.ARTICLEID});

  ArticleModel.belongsToMany(CategoryModel, {
    through: ArticleCategoryModel,
    as: {singular: ArticleCategoryProperty.CATEGORY.singular, plural: ArticleCategoryProperty.CATEGORY.plural},
  });
  CategoryModel.belongsToMany(ArticleModel, {
    through: ArticleCategoryModel,
    as: {singular: ArticleCategoryProperty.CATEGORY.singular, plural: ArticleCategoryProperty.CATEGORY.plural},
  });
  CategoryModel.hasMany(ArticleCategoryModel, {as: TableName.ARTICLES_CATEGORIES});
  return {
    CategoryModel,
    ArticleModel,
    CommentModel,
    ArticleCategoryModel,
  };
}
