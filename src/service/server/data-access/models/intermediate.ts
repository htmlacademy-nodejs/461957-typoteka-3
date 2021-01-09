import {Model, ModelCtor, Sequelize} from "sequelize";
import {modelOptions} from "./constants/model-options";

export const defineIntermediateModel = <T, J>(sequelize: Sequelize, modelName: string): ModelCtor<Model<T, J>> => {
  return sequelize.define<Model<T, J>>(modelName, undefined, {
    ...modelOptions,
    tableName: modelName,
  });
};
