import {IAnnounce, ICategoriesIds, ICreatedDate, IFullText, ITitle} from "../article";

export interface IArticleCreating extends ITitle, ICreatedDate, IAnnounce, IFullText, ICategoriesIds {}
