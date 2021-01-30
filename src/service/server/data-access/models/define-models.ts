import {Sequelize} from "sequelize";
import {defineCategory, ICategoryModel} from "./category";
import {defineArticle, IArticleModel} from "./article";
import {defineComment, ICommentModel} from "./comment";
import {defineIntermediateModel} from "./intermediate";
import {TableName} from "../constants/table-name";
import {ArticleCategoryProperty, ArticleProperty, CommentProperty, UserProperty} from "../constants/property-name";
import {defineUser, IUserModel} from "./user";
import {defineRole, IRoleModel} from "./role";

export interface DatabaseModels {
  CategoryModel: ICategoryModel;
  ArticleModel: IArticleModel;
  CommentModel: ICommentModel;
  UserModel: IUserModel;
  RoleModel: IRoleModel;
}

export function defineDatabaseModels(connection: Sequelize): DatabaseModels {
  const CategoryModel = defineCategory(connection);
  const ArticleModel = defineArticle(connection);
  const CommentModel = defineComment(connection);
  const RoleModel = defineRole(connection);
  const UserModel = defineUser(connection);

  const ArticleCategoryModel = defineIntermediateModel(connection, TableName.ARTICLES_CATEGORIES);

  RoleModel.hasMany(UserModel);
  UserModel.belongsTo(RoleModel, {foreignKey: UserProperty.ROLE_ID});

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
    UserModel,
    RoleModel,
  };
}
