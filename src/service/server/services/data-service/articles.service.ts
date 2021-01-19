import {IArticleModel} from "../../data-access/models/article";
import {IIntermediateModel} from "../../data-access/models/intermediate";
import {Article, NewArticle} from "../../../../types/article";
import {TableName} from "../../data-access/constants/table-name";
import {Model} from "sequelize";
import {CategoryId} from "../../../../types/category-id";
import {Includeable} from "sequelize/types/lib/model";

interface NestedCategory {
  categories: {id: CategoryId}[];
}

type Override<T extends NewArticle, T2> = Omit<T, keyof T2> & T2;

export class ArticlesService {
  constructor(
    private readonly ArticleModel: IArticleModel,
    private readonly ArticleCategoryModel: IIntermediateModel,
  ) {}

  public async findAll(areCommentsRequired: false): Promise<NewArticle[]>;
  public async findAll(areCommentsRequired: true): Promise<Article[]>;
  public async findAll(areCommentsRequired: boolean): Promise<Article[] | NewArticle[]> {
    const include: Includeable[] = [
      {
        association: TableName.CATEGORIES,
        attributes: [`id`],
        through: {attributes: []},
      },
    ];
    let articles: Model<Override<Article, NestedCategory> | Override<NewArticle, NestedCategory>>[];
    if (areCommentsRequired) {
      articles = await this.ArticleModel.findAll<Model<Override<Article, NestedCategory>>>({include});
    } else {
      articles = await this.ArticleModel.findAll<Model<Override<NewArticle, NestedCategory>>>({
        attributes: [`announce`, [`full_text`, `fullText`], `title`, `id`, [`created_date`, `createdDate`]],
        include,
      });
    }
    return articles
      .map(item => item.get({plain: true}))
      .map(item => ({...item, categories: item.categories.map(category => category.id)}));
  }

  // public async findPage({limit, offset}: {limit: number; offset: number}): Promise<Article[]> {}
  // public async findOne(areCommentsRequired: boolean): Promise<Article> {}
  // public async drop(id: ArticleId): Promise<void> {}
  // public async create(): Promise<Article[]> {}
  // public async update(): Promise<void> {}
}
