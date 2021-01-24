import {IAnnounce, IArticleId, ICategories, ICommentsCount, ICreatedDate, ITitle} from "../article";

export interface IArticlePreview extends IArticleId, ICommentsCount, ICreatedDate, ITitle, IAnnounce, ICategories {}
