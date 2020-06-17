import {Article} from "../../../../types/article";
import {promises} from "fs";
import {MOCK_FILE_PATH} from "../../../../constants-es6";
import {ArticleComment} from "../../../../types/article-comment";

export class DataProviderService {
  public async getCategories(): Promise<string[] | null> {
    const articles = await this.getArticles();
    if (articles === null) {
      return null;
    }
    return Array.from(new Set(articles.map(article => article.category).flat(1)));
  }

  public async getArticles(): Promise<Article[] | null> {
    try {
      return JSON.parse(await promises.readFile(MOCK_FILE_PATH, `utf-8`)) as Article[];
    } catch (e) {
      console.error(`Failed to get articles`);
      return null;
    }
  }

  public async searchByArticlesTitle(query: string): Promise<Article[] | null> {
    const articles = await this.getArticles();
    if (articles === null) {
      return null;
    }
    return articles.filter(article => article.title.includes(query));
  }

  public async getArticleById(id: string): Promise<Article | null> {
    const articles = await this.getArticles();
    if (articles === null) {
      return null;
    }
    return articles.find(article => article.id === id) ?? null;
  }

  public async getCommentsByArticleId(id: string): Promise<ArticleComment[] | null> {
    const article = await this.getArticleById(id);
    if (article === null) {
      return null;
    }
    return article.comments;
  }
}
