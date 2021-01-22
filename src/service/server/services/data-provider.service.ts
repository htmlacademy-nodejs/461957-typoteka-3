import {Article} from "../../../types/article";
import {promises} from "fs";
import {MockFilePath} from "../../../constants-es6";
import {ArticleId} from "../../../types/article-id";

export class DataProviderService {
  public articlesCash: Article[];

  private async getArticles(count?: number): Promise<Article[] | null> {
    if (!this.articlesCash) {
      try {
        this.articlesCash = JSON.parse(await promises.readFile(MockFilePath.ARTICLES, `utf-8`)) as Article[];
      } catch (e) {
        console.error(`Failed to get articles`);
        this.articlesCash = null;
      }
    }
    return this.articlesCash?.slice(0, count);
  }

  private async getArticleById(id: ArticleId): Promise<Article | null> {
    const articles = await this.getArticles();
    if (articles === null) {
      return null;
    }
    return articles.find(article => article.id === id) ?? null;
  }

  public async updateArticle(id: ArticleId, article: Article): Promise<Article | null> {
    const existingArticle = await this.getArticleById(id);
    if (existingArticle === null) {
      return null;
    }
    return Object.assign(existingArticle, article);
  }
}
