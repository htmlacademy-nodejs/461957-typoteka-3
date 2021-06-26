import {Model, Op, Sequelize} from "sequelize";
import {ArticleSearchResult} from "../../../../types/article-search-result";

import {IArticleModel} from "../models/article";

export class SearchService {
  constructor(private readonly ArticleModel: IArticleModel) {}

  public async searchByArticlesTitle(query: string): Promise<ArticleSearchResult[] | null> {
    const articles = await this.ArticleModel.findAll<Model<ArticleSearchResult>>({
      attributes: [`id`, `title`, `createdDate`],
      where: Sequelize.where(Sequelize.fn(`LOWER`, Sequelize.col(`title`)), {
        [Op.like]: `%${query.toLowerCase()}%`,
      }),
    });
    return articles.map(article => article.get());
  }
}
