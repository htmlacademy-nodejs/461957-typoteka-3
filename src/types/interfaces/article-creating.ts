import {IAnnounce, ICategoriesIds, ICreatedDate, IFullText, ITitle} from "../article";

import {IAuthorId} from "./author-id";
import {IPictureName} from "./picture-name";

interface IArticleCreating extends ITitle, ICreatedDate, IAnnounce, IFullText, ICategoriesIds, IAuthorId, IPictureName {}

export {
  IArticleCreating,
};
