import {Model, ModelCtor, Sequelize} from "sequelize";
import {defineCategory} from "./category";
import {defineArticle} from "./article";
import {defineComment} from "./comment";
import {defineIntermediateModel} from "./intermediate";
import {TableName} from "../constants/table-name";
import {ArticleCategoryProperty, ArticleProperty, CommentProperty} from "../constants/property-name";

export function defineDatabaseModels(
  connection: Sequelize,
): {
  CategoryModel: ModelCtor<Model>;
  ArticleModel: ModelCtor<Model>;
  CommentModel: ModelCtor<Model>;
  CategoryArticleIntermediateModel: ModelCtor<Model>;
} {
  const CategoryModel = defineCategory(connection);
  const ArticleModel = defineArticle(connection);
  const CommentModel = defineComment(connection);
  const CategoryArticleIntermediateModel = defineIntermediateModel(connection, TableName.ARTICLES_CATEGORIES);

  ArticleModel.hasMany(CommentModel, {as: ArticleProperty.COMMENTS, foreignKey: CommentProperty.ARTICLEID});
  CommentModel.belongsTo(ArticleModel, {foreignKey: CommentProperty.ARTICLEID});

  ArticleModel.belongsToMany(CategoryModel, {
    through: CategoryArticleIntermediateModel,
    as: ArticleCategoryProperty.CATEGORY,
  });
  CategoryModel.belongsToMany(ArticleModel, {
    through: CategoryArticleIntermediateModel,
    as: ArticleCategoryProperty.ARTICLE,
  });
  return {
    CategoryModel,
    ArticleModel,
    CommentModel,
    CategoryArticleIntermediateModel,
  };
}
