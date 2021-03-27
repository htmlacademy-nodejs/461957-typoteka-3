import {IAnnounce, ICreatedDate, ICsrf, IFullText, ITitle} from "./article";

export interface ArticleFromBrowser extends ITitle, ICreatedDate, IAnnounce, IFullText, ICsrf {
  categories: Record<string, `on`>;
}
