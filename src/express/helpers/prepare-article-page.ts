import {ClientRoute} from "../../shared/constants/routes/client-route";
import {dataProviderService} from "../services";
import {CategoryWithLinksAndNumbers} from "../../types/category-with-links-and-numbers";
import {resolveLinksToCategoriesWithNumbers} from "../utils/resolve-links-to-categories-with-numbers";
import {ArticlePage, ArticlePageProps} from "../views/pages/article-page";
import {filterSelectedCategories} from "../utils/filter-selected-categories";
import {ArticleId} from "../../types/article-id";
import {IPreparedPage} from "../../types/interfaces/prepared-page";
import {ICurrentUser} from "../views/interfaces/current-user";
import {ICsrfInput} from "../views/interfaces/csrf-input";

import {getPictureSrc} from "./picture-src-resolver";

interface Props extends ICurrentUser, ICsrfInput {
  articleId: ArticleId;
  newComment?: string;
}

async function prepareArticlePage({
  articleId,
  currentUser,
  csrf,
  newComment,
}: Props): Promise<IPreparedPage<ArticlePageProps>> {
  const [article, categories, comments] = await Promise.all([
    dataProviderService.getArticleById(articleId),
    dataProviderService.getCategoriesWithNumbers(),
    dataProviderService.getArticleComments(articleId),
  ]);
  const categoriesWithLinksAndNumbers: CategoryWithLinksAndNumbers[] = resolveLinksToCategoriesWithNumbers(categories);
  return {
    page: ArticlePage,
    props: {
      categories: filterSelectedCategories(categoriesWithLinksAndNumbers, article.categories),
      createdDate: article.createdDate,
      title: article.title,
      previousPageUrl: undefined,
      fullText: article.fullText,
      newCommentEndPoint: `${ClientRoute.COMMENTS}/${articleId}`,
      imageSrc: article.pictureName ? getPictureSrc(article.pictureName) : ``,
      commentValidationResponse: {},
      comments,
      currentUser,
      csrf,
      newComment,
    },
  };
}

export {prepareArticlePage};
