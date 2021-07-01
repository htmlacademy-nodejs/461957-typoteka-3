import {DataTypes, Model, ModelCtor, Sequelize} from "sequelize";

import {IUser} from "../../../../types/interfaces/user";
import {IUserCreating} from "../../../../types/interfaces/user-creating";
import {TableName} from "../constants/table-name";

import {modelOptions} from "./constants/model-options";

type PredefinedUserAttributes = IUser;
type UserCreationAttributes = IUserCreating;
type IUserEntity = Model<PredefinedUserAttributes, UserCreationAttributes>;
type IUserModel = ModelCtor<IUserEntity>;

const defineUser = (sequelize: Sequelize): IUserModel =>
  sequelize.define<IUserEntity>(
    `User`,
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(60),
        allowNull: false,
      },
    },
    {
      ...modelOptions,
      tableName: TableName.USERS,
    },
  );

export {
  IUserEntity,
  IUserModel,
  defineUser,
};
