import {IAnnounce, IArticleId, ICommentsCount, ICreatedDate, IFullText, ITitle} from "../article";

import {IAuthorId} from "./author-id";

export interface IArticlePlain
  extends IArticleId,
    ICommentsCount,
    ICreatedDate,
    IFullText,
    ITitle,
    IAnnounce,
    IAuthorId {}
