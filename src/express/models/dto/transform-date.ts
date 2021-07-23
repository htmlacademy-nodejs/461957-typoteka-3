import {ICreatedDate} from "../../../types/article";

function transformDate<T extends ICreatedDate>(item: T): T {
  return {...item, createdDate: new Date(Date.parse((item.createdDate as unknown) as string))};
}

export {transformDate};
