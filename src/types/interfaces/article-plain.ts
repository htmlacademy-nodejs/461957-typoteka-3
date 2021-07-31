import {IAnnounce, IArticleId, ICommentsCount, ICreatedDate, IFullText, ITitle} from "../article";

import {IAuthorId} from "./author-id";
import {IPictureName} from "./picture-name";

interface IArticlePlain
  extends IArticleId,
    ICommentsCount,
    ICreatedDate,
    IFullText,
    ITitle,
    IAnnounce,
    IPictureName,
    IAuthorId {}

export {
  IArticlePlain,
};
