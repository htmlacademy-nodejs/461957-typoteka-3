import {HttpCode} from "../../../constants-es6";
import {ControllerResponse} from "../../../types/controller-response";
import {ArticleSearchCollection} from "../../../types/article-search-collection";
import {SearchService} from "../services/data-service/search.service";

export class SearchController {
  constructor(private searchService: SearchService) {}

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
    const matches = await this.searchService.searchByArticlesTitle(query);
    if (matches === null) {
      return {status: HttpCode.INTERNAL_SERVER_ERROR};
    }
    console.log(matches);
    return {
      payload: {
        query,
        items: matches,
        itemsCount: matches.length,
      },
    };
  }
}
