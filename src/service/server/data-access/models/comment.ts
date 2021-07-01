import {DataTypes, Model, ModelCtor, Sequelize} from "sequelize";

import {ArticleComment} from "../../../../types/article-comment";
import {ICommentCreating} from "../../../../types/interfaces/comment-creating";
import {TableName} from "../constants/table-name";

import {modelOptions} from "./constants/model-options";

type PredefinedCommentAttributes = ArticleComment;
type CommentCreationAttributes = ICommentCreating;
type ICommentEntity = Model<PredefinedCommentAttributes, CommentCreationAttributes>;
type ICommentModel = ModelCtor<ICommentEntity>;

const defineComment = (sequelize: Sequelize): ICommentModel =>
  sequelize.define<ICommentEntity>(
    `Comment`,
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      text: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      articleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      ...modelOptions,
      tableName: TableName.COMMENTS,
    },
  );

export {
  ICommentEntity,
  ICommentModel,
  defineComment,
};
