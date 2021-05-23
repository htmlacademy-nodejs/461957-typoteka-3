import {IArticleId, ICreatedDate, ITitle} from "../article";

export interface IArticleTitleAndDate extends IArticleId, ICreatedDate, ITitle {}
