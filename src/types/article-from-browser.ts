import {IAnnounce, ICreatedDate, IFullText, ITitle} from "./article";

export interface ArticleFromBrowser extends ITitle, ICreatedDate, IAnnounce, IFullText {
  categories: Record<string, `on`>;
}
