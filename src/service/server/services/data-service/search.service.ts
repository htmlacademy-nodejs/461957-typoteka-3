import {IArticleModel} from "../../data-access/models/article";
import {Model, Sequelize} from "sequelize";
import {ArticleSearchResult} from "../../../../types/article-search-result";

export class SearchService {
  constructor(private readonly ArticleModel: IArticleModel) {}

  public async searchByArticlesTitle(query: string): Promise<ArticleSearchResult[] | null> {
    const articles = await this.ArticleModel.findAll<Model<ArticleSearchResult>>({
      attributes: [`id`, `title`, `createdDate`],
      where: Sequelize.where(Sequelize.fn(`LOWER`, Sequelize.col(`title`)), Sequelize.fn(`LOWER`, `%${query}%`)),
    });
    return articles.map(article => article.get());
  }
}
