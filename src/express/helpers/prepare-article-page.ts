import {dataProviderService} from "../services";
import {CategoryWithLinksAndNumbers} from "../../types/category-with-links-and-numbers";
import {resolveLinksToCategoriesWithNumbers} from "../utils/resolve-links-to-categories-with-numbers";
import {ArticlePage, ArticlePageProps} from "../views/pages/ArticlePage";
import {filterSelectedCategories} from "../utils/filter-selected-categories";
import {ArticleId} from "../../types/article-id";
import {IPreparedPage} from "../../types/interfaces/prepared-page";
import {ClientRoutes} from "../../constants-es6";

interface Props {
  articleId: ArticleId;
}

export async function prepareArticlePage({articleId}: Props): Promise<IPreparedPage<ArticlePageProps>> {
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
      newCommentEndPoint: `${ClientRoutes.COMMENTS}/${articleId}`,
      comments,
    },
  };
}
