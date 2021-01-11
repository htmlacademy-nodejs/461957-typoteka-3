import {defineDatabaseModels} from "./models";
import {ExitCode} from "../../../constants-es6";
import {getLogger} from "../../logger";
import {connectToDatabase} from "./database-connector";

export async function initDatabase(): Promise<void> {
  const logger = getLogger();
  const connection = await connectToDatabase();
  try {
    const {CategoryModel, ArticleModel, CommentModel} = defineDatabaseModels(connection);
    await connection.sync({force: true});

    await CategoryModel.create({label: `wwwww`});
    await ArticleModel.create({
      category: [1],
      createdDate: new Date(Date.now()),
      announce: `announce`,
      comments: [],
      fullText: `fullText`,
      title: `title`,
    });
    await CommentModel.create({
      text: `initial comment`,
      articleId: 1,
      createdDate: new Date(Date.now()),
    });
    console.log(await CategoryModel.findAll({raw: true}));
    console.log(await ArticleModel.findAll({raw: true}));
  } catch (e) {
    logger.error(`Failed to Create categories,\n${(e as Error).toString()}`);
    process.exit(ExitCode.ERROR);
  }
}

void initDatabase();
