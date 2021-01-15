import {DataProviderService} from "../services/data-provider.service";
import {HttpCode} from "../../../constants-es6";
import {ControllerResponse} from "../../../types/controller-response";
import {Article} from "../../../types/article";
import {ArticleSearchResult} from "../../../types/article-search-result";
import {ArticleSearchCollection} from "../../../types/article-search-collection";

export class SearchController {
  constructor(private dataProvider: DataProviderService) {}

  public async findArticleByMatch(query: string): Promise<ControllerResponse<ArticleSearchCollection>> {
    if (query === undefined) {
      return {status: HttpCode.BAD_REQUEST};
    }
    if (query === `` || query === ` `) {
      return {
        payload: {
          query,
          items: [],
          itemsCount: 0,
        },
      };
    }
    const matches = await this.dataProvider.searchByArticlesTitle(query);
    if (matches === null) {
      return {status: HttpCode.INTERNAL_SERVER_ERROR};
    }
    return {
      payload: {
        query,
        items: matches.map(article => convertArticleToSearchResult(article)),
        itemsCount: matches.length,
      },
    };
  }
}

function convertArticleToSearchResult(article: Article): ArticleSearchResult {
  return {
    title: article.title,
    createdDate: article.createdDate,
    id: article.id,
  };
}
