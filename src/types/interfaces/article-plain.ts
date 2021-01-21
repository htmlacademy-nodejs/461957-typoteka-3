import {IAnnounce, IArticleId, ICommentsCount, ICreatedDate, IFullText, ITitle} from "../article";

export interface IArticlePlain extends IArticleId, ICommentsCount, ICreatedDate, IFullText, ITitle, IAnnounce {}
