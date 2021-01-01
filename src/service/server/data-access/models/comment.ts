import {DataTypes, Model, ModelCtor, Sequelize} from "sequelize";
import {TableName} from "../constants/table-name";
import {ArticleComment} from "../../../../types/article-comment";

type PredefinedCommentAttributes = ArticleComment;
type CommentCreationAttributes = Omit<ArticleComment, `id`>;

export const defineComment = (sequelize: Sequelize): ModelCtor<Model<PredefinedCommentAttributes, CommentCreationAttributes>> =>
  sequelize.define<Model<PredefinedCommentAttributes, CommentCreationAttributes>>(
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
      timestamps: true,
      paranoid: true,
      tableName: TableName.COMMENTS,
    },
  );
