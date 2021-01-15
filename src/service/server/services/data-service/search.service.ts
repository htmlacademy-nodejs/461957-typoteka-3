import {IArticleModel} from "../../data-access/models/article";
import {Model, Op} from "sequelize";
import {TableName} from "../../data-access/constants/table-name";
import {ArticleSearchResult} from "../../../../types/article-search-result";

export class SearchService {
  constructor(private readonly ArticleModel: IArticleModel) {}

  public async searchByArticlesTitle(query: string): Promise<ArticleSearchResult[] | null> {
    const articles = await this.ArticleModel.findAll<Model<ArticleSearchResult>>({
      attributes: [`id`, `title`, `createdDate`],
      where: {
        title: {
          [Op.iLike]: `%${query}%`,
        },
      },
      include: [TableName.CATEGORIES],
    });
    return articles.map(article => article.get());
  }
}
