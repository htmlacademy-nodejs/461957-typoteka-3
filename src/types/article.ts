import type {ArticleComment} from "./article-comment";
import type {NewArticle} from "./new-article";

export interface Article extends NewArticle {
  id: string;
  comments: ArticleComment[];
}
