import {IArticleModel} from "../../data-access/models/article";
import {IIntermediateModel} from "../../data-access/models/intermediate";

export class ArticlesService {
  constructor(
    private readonly ArticleModel: IArticleModel,
    private readonly ArticleCategoryModel: IIntermediateModel,
  ) {}
}
