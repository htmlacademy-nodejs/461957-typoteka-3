import {CliAction} from "../../types/cli-action";
import {Article} from "../../types/article";
import {ArticleComment} from "../../types/article-comment";
import {DAYS_IN_MONTH, ExitCode, MOCK_FILE_PATH, MockTextsFilePath, MS_IN_DAY} from "../../constants-es6";
import chalk from "chalk";
import {nanoid} from "nanoid";
import {promises} from "fs";
import {getRandomInt, shuffle} from "../../utils";

const DEFAULT_COUNT: number = 1;
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

function getDate(currentDate: number): number {
  return currentDate - 1 - getRandomInt(0, THREE_MONTHS_DURATION);
}

async function readFile(filePath: string): Promise<string[]> {
  try {
    const rawContent: string = await promises.readFile(filePath, `utf8`);
    return rawContent
      .replace(/(\r\n)/gm, `\n`)
      .replace(/(\r)/gm, `\n`)
      .split(`\n`)
      .filter((item) => !!item.length);
  } catch (e) {
    console.error(chalk.red(`Fail to read file ${filePath}`));
    console.error(chalk.red(e));
    return [];
  }
}

async function generateMocks(count: number, sentencesFilePath: string, categoriesFilePath: string, titlesFilePath: string, commentsFilePath: string): Promise<Article[]> {
  const [sentences, categories, titles, comments] = await Promise.all([
    readFile(sentencesFilePath),
    readFile(categoriesFilePath),
    readFile(titlesFilePath),
    readFile(commentsFilePath),
  ]);
  return Array(count).fill(undefined).map((value, index) => ({
    id: index ? nanoid() : validArticleId,
    announce: shuffle(sentences).slice(AnnounceRestrict.min, getRandomInt(AnnounceRestrict.min + 1, AnnounceRestrict.max)).join(` `),
    category: shuffle(categories).slice(CategoriesRestrict.min, getRandomInt(CategoriesRestrict.min + 1, CategoriesRestrict.max)),
    createdDate: new Date(getDate(Date.now())),
    fullText: shuffle(sentences).slice(0, sentences.length - 1).join(` `),
    title: titles[getRandomInt(0, titles.length - 1)],
    comments: getComments(comments, CommentRestrict.max, !index).slice(CommentRestrict.min, getRandomInt(CommentRestrict.min, AnnounceRestrict.max)),
  }));
}

export const cliAction: CliAction = {
  name: `--generate`,
  async run(args?) {
    const [mockCountInput] = args;
    const mockCount = parseInt(mockCountInput, 10) || DEFAULT_COUNT;
    if (mockCount > 1000) {
      console.error(chalk.red(`Не больше 1000 публикаций, введенное значение: ${mockCount}`));
      process.exit(ExitCode.SUCCESS);
    }
    const mocks = await generateMocks(mockCount, MockTextsFilePath.SENTENCES, MockTextsFilePath.CATEGORIES, MockTextsFilePath.TITLES, MockTextsFilePath.COMMENTS);
    const content = JSON.stringify(mocks, undefined, 2);
    try {
      await promises.writeFile(MOCK_FILE_PATH, content);
      console.log(chalk.green(`${mockCount} article(s) saved to ${MOCK_FILE_PATH}`));
    } catch (e) {
      console.error(chalk.red(`Fail to write file ${MOCK_FILE_PATH}`));
      console.error(chalk.red(e));
    }
  },
};

function getComments(commentsSentences: string[], length: number, forceCreateComments: boolean): ArticleComment[] {
  return Array(forceCreateComments ? length + 1 : length).fill(undefined).map<ArticleComment>((value, index) => ({
    id: index ? nanoid() : validCommentId,
    text: shuffle(commentsSentences).slice(CommentTextRestrict.min, getRandomInt(CommentTextRestrict.min + 1, CommentTextRestrict.max)).join(` `),
  }));
}
