import {CliAction} from "../../types/cli-action";
import {Article} from "../../types/article";
import {ArticleComment} from "../../types/article-comment";
import {DAYS_IN_MONTH, ExitCode, MockFilePath, MockTextsFilePath, MS_IN_DAY} from "../../constants-es6";
import chalk from "chalk";
import {nanoid} from "nanoid";
import {promises} from "fs";
import {getRandomInt, shuffle} from "../../utils";
import {Category} from "../../types/category";
import {transliterate} from "../../shared/transliterate";
import {CategoryId} from "../../types/category-id";

const DEFAULT_COUNT = 10;
const THREE_MONTHS_DURATION = 3 * DAYS_IN_MONTH * MS_IN_DAY;
const validArticleId = `-H91UO1mzYQSeSGK2rxWC`;
const validCommentId = `-ZyTZtrsZjjBq8k5Bskzjb`;

const CategoriesRestrict = {
  min: 0,
  max: 5,
};

const AnnounceRestrict = {
  min: 0,
  max: 5,
};

const CommentRestrict = {
  min: 0,
  max: 10,
};

const CommentTextRestrict = {
  min: 1,
  max: 5,
};

function getDate(currentDate: number): Date {
  return new Date(currentDate - 1 - getRandomInt(0, THREE_MONTHS_DURATION));
}

export async function readTXTFile(filePath: string): Promise<string[]> {
  try {
    const rawContent: string = await promises.readFile(filePath, `utf8`);
    return rawContent
      .replace(/(\r\n)/gm, `\n`)
      .replace(/(\r)/gm, `\n`)
      .split(`\n`)
      .filter(item => !!item.length);
  } catch (e) {
    console.error(chalk.red(`Fail to read file ${filePath}`));
    console.error(chalk.red(e));
    return [];
  }
}

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
      category: getCategories(categories),
      createdDate: getDate(Date.now()),
      fullText: getFullText(sentences),
      title: getTitle(titles),
      comments: getComments(comments),
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
      category: getCategories(categories),
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

function getComments(commentsSentences: string[]): ArticleComment[] {
  return Array(CommentRestrict.max)
    .fill(undefined)
    .map<ArticleComment>(() => ({
      id: nanoid(),
      text: shuffle(commentsSentences)
        .slice(CommentTextRestrict.min, getRandomInt(CommentTextRestrict.min + 1, CommentTextRestrict.max))
        .join(` `),
    }))
    .slice(CommentRestrict.min, getRandomInt(CommentRestrict.min, AnnounceRestrict.max));
}

function getCommentsForTests(commentsSentences: string[], forceCreateComments: boolean): ArticleComment[] {
  return Array(forceCreateComments ? CommentRestrict.max + 1 : CommentRestrict.max)
    .fill(undefined)
    .map<ArticleComment>((value, index) => ({
      id: index ? nanoid() : validCommentId,
      text: shuffle(commentsSentences)
        .slice(CommentTextRestrict.min, getRandomInt(CommentTextRestrict.min + 1, CommentTextRestrict.max))
        .join(` `),
    }))
    .slice(CommentRestrict.min, getRandomInt(CommentRestrict.min, AnnounceRestrict.max));
}

function getAnnounce(sentences: string[]): string {
  return shuffle(sentences)
    .slice(AnnounceRestrict.min, getRandomInt(AnnounceRestrict.min + 1, AnnounceRestrict.max))
    .join(` `);
}

function getCategories(categories: string[]): CategoryId[] {
  return shuffle(categories)
    .slice(CategoriesRestrict.min, getRandomInt(CategoriesRestrict.min + 1, CategoriesRestrict.max))
    .map(transliterate);
}

function getFullText(sentences: string[]): string {
  return shuffle(sentences)
    .slice(0, sentences.length - 1)
    .join(` `);
}

function getTitle(titles: string[]): string {
  return titles[getRandomInt(0, titles.length - 1)];
}

function generateCategoriesMocks(categoriesNames: CategoryId[]): Category[] {
  return categoriesNames.map(categoryName => ({id: transliterate(categoryName), label: categoryName}));
}
