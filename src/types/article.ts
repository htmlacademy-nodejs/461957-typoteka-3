import {ArticleComment} from "./article-comment";
import {NewArticle} from "./new-article";

export interface Article extends NewArticle {
  id: string;
  comments: ArticleComment[];
}
