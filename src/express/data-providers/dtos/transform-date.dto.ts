import {ICreatedDate} from "../../../types/article";
import {transformDate} from "../internal";

function transformDateDto<T extends ICreatedDate>(item: T): T {
  return {...item, createdDate: transformDate(item.createdDate)};
}

export {transformDateDto};
