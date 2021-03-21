import {DataTypes, Model, ModelCtor, Sequelize} from "sequelize";
import {modelOptions} from "./constants/model-options";
import {TableName} from "../constants/table-name";
import {UserId} from "../../../../types/user-id";
import {RefreshTokenProperty} from "../constants/property-name";

interface ITokenRecord {
  token: string;
  userId: UserId;
}

export type IRefreshTokenEntity = Model<ITokenRecord, ITokenRecord>;
export type IRefreshTokenModel = ModelCtor<IRefreshTokenEntity>;

export const defineRefreshToken = (sequelize: Sequelize): IRefreshTokenModel =>
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
        primaryKey: true,
        allowNull: false,
      },
    },
    {
      ...modelOptions,
      tableName: TableName.REFRESH_TOKENS,
    },
  );
