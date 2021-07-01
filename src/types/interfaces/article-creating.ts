import {IAnnounce, ICategoriesIds, ICreatedDate, IFullText, ITitle} from "../article";

import {IAuthorId} from "./author-id";

interface IArticleCreating extends ITitle, ICreatedDate, IAnnounce, IFullText, ICategoriesIds, IAuthorId {}

export {
  IArticleCreating,
};
