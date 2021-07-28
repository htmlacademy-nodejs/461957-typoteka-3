import {
  IAnnounce,
  ICategoriesIds,
  ICreatedDate,
  IFullText,
  IPictureContent,
  IPictureMimeType,
  ITitle,
} from "../article";

import {IAuthorId} from "./author-id";

interface IArticleCreating
  extends ITitle,
    ICreatedDate,
    IAnnounce,
    IFullText,
    ICategoriesIds,
    IAuthorId,
    Partial<IPictureContent>,
    Partial<IPictureMimeType> {}

export {IArticleCreating};
