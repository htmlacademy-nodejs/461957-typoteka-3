import {Sequelize} from "sequelize";

import {ArticleCategoryProperty, ArticleProperty, CommentProperty, UserProperty} from "../constants/property-name";
import {TableName} from "../constants/table-name";

import {defineArticle, IArticleModel} from "./article";
import {defineCategory, ICategoryModel} from "./category";
import {defineComment, ICommentModel} from "./comment";
import {defineIntermediateModel} from "./intermediate";
import {defineRefreshToken, IRefreshTokenModel} from "./refresh-tokens";
import {defineRole, IRoleModel} from "./role";
import {defineUser, IUserModel} from "./user";

interface DatabaseModels {
  CategoryModel: ICategoryModel;
  ArticleModel: IArticleModel;
  CommentModel: ICommentModel;
  UserModel: IUserModel;
  RoleModel: IRoleModel;
  RefreshTokenModel: IRefreshTokenModel;
}

function defineDatabaseModels(connection: Sequelize): DatabaseModels {
  const CategoryModel = defineCategory(connection);
  const ArticleModel = defineArticle(connection);
  const CommentModel = defineComment(connection);
  const RoleModel = defineRole(connection);
  const UserModel = defineUser(connection);
  const RefreshTokenModel = defineRefreshToken(connection);

  const ArticleCategoryModel = defineIntermediateModel(connection, TableName.ARTICLES_CATEGORIES);

  RoleModel.hasMany(UserModel);
  UserModel.belongsTo(RoleModel, {foreignKey: UserProperty.ROLE_ID});

  UserModel.hasMany(ArticleModel, {foreignKey: ArticleProperty.AUTHORID});
  ArticleModel.belongsTo(UserModel, {foreignKey: ArticleProperty.AUTHORID});

  UserModel.hasMany(CommentModel, {foreignKey: CommentProperty.AUTHORID});
  CommentModel.belongsTo(UserModel, {foreignKey: CommentProperty.AUTHORID, as: TableName.USERS});

  ArticleModel.hasMany(CommentModel, {as: ArticleProperty.COMMENTS, foreignKey: CommentProperty.ARTICLEID});
  CommentModel.belongsTo(ArticleModel, {foreignKey: CommentProperty.ARTICLEID, as: TableName.ARTICLES});

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
    UserModel,
    RoleModel,
    RefreshTokenModel,
  };
}

export {
  DatabaseModels,
  defineDatabaseModels,
};
