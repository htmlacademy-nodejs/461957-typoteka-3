import {DataTypes, Model, ModelCtor, Sequelize} from "sequelize";

import {IRole} from "../../../../types/interfaces/role";
import {TableName} from "../constants/table-name";

import {modelOptions} from "./constants/model-options";

type PredefinedAttributes = IRole;
type CreationAttributes = IRole;
export type IRoleEntity = Model<PredefinedAttributes, CreationAttributes>;
export type IRoleModel = ModelCtor<IRoleEntity>;

export const defineRole = (sequelize: Sequelize): IRoleModel =>
  sequelize.define<IRoleEntity>(
    `Role`,
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      ...modelOptions,
      tableName: TableName.ROLES,
    },
  );
