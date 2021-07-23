import {IArticlePlain} from "../../../types/interfaces/article-plain";
import {IArticlePreview} from "../../../types/interfaces/article-preview";
import {getPictureSrc} from "../../helpers/picture-src-resolver";
import {ICategories} from "../../../types/article";

function articlePreviewDto(article: IArticlePlain & ICategories): IArticlePreview {
  return {
    id: article.id,
    announce: article.announce,
    commentsCount: article.commentsCount,
    createdDate: new Date(Date.parse((article.createdDate as unknown) as string)),
    title: article.title,
    imageSrc: getPictureSrc(article.pictureName),
    categories: article.categories,
  };
}

export {articlePreviewDto};
