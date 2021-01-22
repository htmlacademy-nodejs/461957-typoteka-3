import {DataTypes, Model, ModelCtor, Sequelize} from "sequelize";
import {TableName} from "../constants/table-name";
import {ArticleComment, NewArticleComment} from "../../../../types/article-comment";
import {modelOptions} from "./constants/model-options";

type PredefinedCommentAttributes = ArticleComment;
type CommentCreationAttributes = NewArticleComment;
export type ICommentEntity = Model<PredefinedCommentAttributes, CommentCreationAttributes>;
export type ICommentModel = ModelCtor<ICommentEntity>;

export const defineComment = (sequelize: Sequelize): ICommentModel =>
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
    },
    {
      ...modelOptions,
      tableName: TableName.COMMENTS,
    },
  );
