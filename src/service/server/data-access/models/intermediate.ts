import {Model, ModelCtor, Sequelize} from "sequelize";

export const defineIntermediateModel = <T, J>(sequelize: Sequelize, modelName: string): ModelCtor<Model<T, J>> => {
  return sequelize.define<Model<T, J>>(modelName, undefined, {
    timestamps: true,
    paranoid: true,
    tableName: modelName,
  });
};
