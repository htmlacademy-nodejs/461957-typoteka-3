import {CliAction} from "../../types/cli-action";
import {Article} from "../../types/article";
import {ArticleComment} from "../../types/article-comment";
import {ExitCode, MockFilePath, MockTextsFilePath} from "../../constants-es6";
import chalk from "chalk";
import {nanoid} from "nanoid";
import {promises} from "fs";
import {getRandomInt, shuffle} from "../../utils";
import {Category} from "../../types/category";
import {readTXTFile} from "./generate-database-mock/fs-functions/read-txt-file";
import {
  getAnnounce,
  getCategoriesIds,
  getComments,
  getDate,
  getFullText,
  getTitle,
} from "./generate-database-mock/values-generators";
import {CommentRestrict, CommentTextRestrict} from "./generate-database-mock/constants/mocks-restrictions";

const DEFAULT_COUNT = 10;
const validArticleId = `-H91UO1mzYQSeSGK2rxWC`;
const validCommentId = `-ZyTZtrsZjjBq8k5Bskzjb`;

function generateMocks(
  count: number,
  sentences: string[],
  categories: string[],
  titles: string[],
  comments: string[],
): Article[] {
  return Array(count)
    .fill(undefined)
    .map(() => ({
      id: getId(),
      announce: getAnnounce(sentences),
      category: getCategoriesIds(categories),
      createdDate: getDate(Date.now()),
      fullText: getFullText(sentences),
      title: getTitle(titles),
      comments: getComments(comments).map(comment => ({...comment, id: getId()})),
    }));
}

function generateMocksForTests(
  count: number,
  sentences: string[],
  categories: string[],
  titles: string[],
  comments: string[],
): Article[] {
  return Array(count)
    .fill(undefined)
    .map((value, index) => ({
      id: getIdForTests(index),
      announce: getAnnounce(sentences),
      category: getCategoriesIds(categories),
      createdDate: getDate(Date.now()),
      fullText: getFullText(sentences),
      title: getTitle(titles),
      comments: getCommentsForTests(comments, !index),
    }));
}

export const cliAction: CliAction = {
  name: `--generate`,
  async run(args?: string) {
    const [mockCountInput, test] = args;
    const mockCount = parseInt(mockCountInput, 10) || DEFAULT_COUNT;
    if (mockCount > 1000) {
      console.error(chalk.red(`Не больше 1000 публикаций, введенное значение: ${mockCount}`));
      process.exit(ExitCode.SUCCESS);
    }
    const isMocksForTests = test === `--test`;
    const [sentences, categories, titles, comments] = await getTextsForMocks(
      MockTextsFilePath.SENTENCES,
      MockTextsFilePath.CATEGORIES,
      MockTextsFilePath.TITLES,
      MockTextsFilePath.COMMENTS,
    );
    const mocks = isMocksForTests
      ? generateMocksForTests(mockCount, sentences, categories, titles, comments)
      : generateMocks(mockCount, sentences, categories, titles, comments);
    const content = JSON.stringify(mocks, undefined, 2);
    const categoriesMocks: Category[] = generateCategoriesMocks(categories);
    const categoriesJSON = JSON.stringify(categoriesMocks, undefined, 2);
    try {
      await Promise.all([
        promises.writeFile(MockFilePath.ARTICLES, content),
        promises.writeFile(MockFilePath.CATEGORIES, categoriesJSON),
      ]);
      console.log(
        chalk.green(`${mockCount} article(s) ${isMocksForTests ? `for tests ` : ``}saved to ${MockFilePath.ARTICLES}`),
      );
      console.log(chalk.green(`${mockCount} categories(s) saved to ${MockFilePath.CATEGORIES}`));
    } catch (e) {
      console.error(chalk.red(`Mock files cannot be written:`, MockFilePath.ARTICLES, MockFilePath.CATEGORIES));
      console.error(chalk.red(e));
    }
  },
};

async function getTextsForMocks(
  sentencesFilePath: string,
  categoriesFilePath: string,
  titlesFilePath: string,
  commentsFilePath: string,
): Promise<[string[], string[], string[], string[]]> {
  return Promise.all([
    readTXTFile(sentencesFilePath),
    readTXTFile(categoriesFilePath),
    readTXTFile(titlesFilePath),
    readTXTFile(commentsFilePath),
  ]);
}

function getId(): string {
  return nanoid();
}

function getIdForTests(index: number): string {
  return index ? nanoid() : validArticleId;
}

function getCommentsForTests(commentsSentences: string[], forceCreateComments: boolean): ArticleComment[] {
  return Array(forceCreateComments ? CommentRestrict.max + 1 : CommentRestrict.max)
    .fill(undefined)
    .map<ArticleComment>((value, index) => ({
      id: index ? nanoid() : validCommentId,
      text: shuffle(commentsSentences)
        .slice(CommentTextRestrict.min, getRandomInt(CommentTextRestrict.min + 1, CommentTextRestrict.max))
        .join(` `),
      articleId: 1,
      createdDate: getDate(Date.now()),
    }))
    .slice(CommentRestrict.min, getRandomInt(CommentRestrict.min, CommentRestrict.max));
}

function generateCategoriesMocks(categoriesNames: string[]): Category[] {
  return categoriesNames.map((categoryName, index) => ({id: index + 1, label: categoryName}));
}
