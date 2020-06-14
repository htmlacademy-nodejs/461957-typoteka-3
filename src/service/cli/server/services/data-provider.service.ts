import {Article} from "../../../../types/article";
import {promises} from "fs";
import {MOCK_FILE_PATH} from "../../../../constants-es6";

export class DataProviderService {
  public async getCategories(): Promise<string[] | null> {
    try {
      return Array.from(
        new Set(
          (await this.getArticles()).map(article => article.category).flat(1),
        ),
      );
    } catch (e) {
      console.error(`Failed to get categories`);
      return null;
    }
  }

  public async getArticles(): Promise<Article[]> {
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
    try {
      return (await this.getArticles()).filter(article => article.title.includes(query));
    } catch (e) {
      console.error(`Failed to get articles`);
      return null;
    }
  }
}

export const dataProviderService = new DataProviderService();
