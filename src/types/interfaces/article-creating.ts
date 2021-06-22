import {IAnnounce, ICategoriesIds, ICreatedDate, IFullText, ITitle} from "../article";
import {IAuthorId} from "./author-id";

export interface IArticleCreating extends ITitle, ICreatedDate, IAnnounce, IFullText, ICategoriesIds, IAuthorId {}
