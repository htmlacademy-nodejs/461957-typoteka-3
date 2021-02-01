import {HttpCode} from "../../../constants-es6";
import {ControllerResponse} from "../../../types/controller-response";
import {ArticleSearchCollection} from "../../../types/article-search-collection";
import {SearchService} from "../data-access/services/search.service";

export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  public async findArticleByMatch(query: string): Promise<ControllerResponse<ArticleSearchCollection>> {
    if (query === undefined) {
      return {status: HttpCode.BAD_REQUEST};
    }
    if (query === `` || query === ` `) {
      return {
        payload: {
          query,
          items: [],
          totalCount: 0,
        },
      };
    }
    const matches = await this.searchService.searchByArticlesTitle(query);
    if (matches === null) {
      return {status: HttpCode.INTERNAL_SERVER_ERROR};
    }
    return {
      payload: {
        query,
        items: matches,
        totalCount: matches.length,
      },
    };
  }
}
