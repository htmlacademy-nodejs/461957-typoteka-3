import {Article} from "../../../../types/article";
import {promises} from "fs";
import {MOCK_FILE_PATH} from "../../../../constants-es6";

export class DataProviderService {
  public async getCategories(): Promise<string[] | null> {
    const articles = await this.getArticles();
    if (articles === null) {
      return null;
    }
    return Array.from(
      new Set(articles.map(article => article.category).flat(1)),
    );
  }

  public async getArticles(): Promise<Article[] | null> {
    try {
      return JSON.parse(
        await promises.readFile(MOCK_FILE_PATH, `utf-8`),
      ) as Article[];
    } catch (e) {
      console.error(`Failed to get articles`);
      return null;
    }
  }

  public async searchByArticlesTitle(query: string): Promise<Article[]> {
    const articles = await this.getArticles();
    if (articles === null) {
      return null;
    }
    return articles.filter(article => article.title.includes(query));
  }
}

export const dataProviderService = new DataProviderService();
