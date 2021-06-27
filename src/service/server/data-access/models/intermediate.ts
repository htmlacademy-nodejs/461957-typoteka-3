import {Model, ModelCtor, Sequelize} from "sequelize";

import {modelOptions} from "./constants/model-options";

export type IIntermediateModel<T = unknown, J = unknown> = ModelCtor<Model<T, J>>;

export const defineIntermediateModel = <T, J>(sequelize: Sequelize, modelName: string): IIntermediateModel<T, J> => {
  return sequelize.define<Model<T, J>>(modelName, undefined, {
    ...modelOptions,
    tableName: modelName,
  });
};
