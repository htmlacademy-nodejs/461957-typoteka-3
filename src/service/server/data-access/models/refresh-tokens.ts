import {DataTypes, Model, ModelCtor, Sequelize} from "sequelize";

import {UserId} from "../../../../types/user-id";
import {RefreshTokenProperty} from "../constants/property-name";
import {TableName} from "../constants/table-name";

import {modelOptions} from "./constants/model-options";

interface ITokenRecord {
  token: string;
  userId: UserId;
}

type IRefreshTokenEntity = Model<ITokenRecord, ITokenRecord>;
type IRefreshTokenModel = ModelCtor<IRefreshTokenEntity>;

const defineRefreshToken = (sequelize: Sequelize): IRefreshTokenModel =>
  sequelize.define<IRefreshTokenEntity>(
    `RefreshToken`,
    {
      [RefreshTokenProperty.TOKEN]: {
        type: DataTypes.STRING,
        autoIncrement: false,
        primaryKey: true,
        allowNull: false,
      },
      [RefreshTokenProperty.USER_ID]: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
      },
    },
    {
      ...modelOptions,
      tableName: TableName.REFRESH_TOKENS,
      timestamps: true,
    },
  );

export {
  IRefreshTokenEntity,
  IRefreshTokenModel,
  defineRefreshToken,
};
