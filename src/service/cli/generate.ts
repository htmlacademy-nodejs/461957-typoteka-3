import {CliAction} from "../../types/cli-action";
import {Article} from "../../types/article";
import {ArticleComment} from "../../types/article-comment";
const {MS_IN_DAY, DAYS_IN_MONTH} = require(`../../utils/time`);
const fs = require(`fs`).promises;
const {getRandomInt, shuffle} = require(`../../utils`);
const {ExitCode} = require(`../../constants`);
const chalk = require(`chalk`);
const {nanoid} = require(`nanoid`);

const DEFAULT_COUNT: number = 1;
const FILE_NAME = `mocks.json`;
const THREE_MONTHS_DURATION = 3 * DAYS_IN_MONTH * MS_IN_DAY;
const MockFilePath = {
  sentences: `./data/sentences.txt`,
  categories: `./data/categories.txt`,
  titles: `./data/titles.txt`,
  comments: `./data/comments.txt`,
};

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
    const rawContent: string = await fs.readFile(filePath, `utf8`);
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
  return Array(count).fill(undefined).map(() => ({
    id: nanoid(),
    announce: shuffle(sentences).slice(AnnounceRestrict.min, getRandomInt(AnnounceRestrict.min + 1, AnnounceRestrict.max)).join(` `),
    category: shuffle(categories).slice(CategoriesRestrict.min, getRandomInt(CategoriesRestrict.min + 1, CategoriesRestrict.max)),
    createdDate: new Date(getDate(Date.now())),
    fullText: shuffle(sentences).slice(0, sentences.length - 1).join(` `),
    title: titles[getRandomInt(0, titles.length - 1)],
    comments: getComments(comments, CommentRestrict.max).slice(CommentRestrict.min, getRandomInt(CommentRestrict.min, AnnounceRestrict.max)),
  }));
}

const cliAction: CliAction = {
  name: `--generate`,
  async run(args?) {
    const [mockCountInput] = args;
    const mockCount = parseInt(mockCountInput, 10) || DEFAULT_COUNT;
    if (mockCount > 1000) {
      console.error(chalk.red(`Не больше 1000 публикаций, введенное значение: ${mockCount}`));
      process.exit(ExitCode.SUCCESS);
    }
    const mocks = await generateMocks(mockCount, MockFilePath.sentences, MockFilePath.categories, MockFilePath.titles, MockFilePath.comments);
    const content = JSON.stringify(mocks, undefined, 2);
    try {
      await fs.writeFile(FILE_NAME, content);
      console.log(chalk.green(`${mockCount} article(s) saved to ${FILE_NAME}`));
    } catch (e) {
      console.error(chalk.red(`Fail to write file ${FILE_NAME}`));
      console.error(chalk.red(e));
    }
  },
};

export = cliAction;

function getComments(commentsSentences: string[], length: number): ArticleComment[] {
  return Array(length).fill(undefined).map<ArticleComment>(() => ({
    id: nanoid(),
    text: shuffle(commentsSentences).slice(CommentTextRestrict.min, getRandomInt(CommentTextRestrict.min + 1, CommentTextRestrict.max)).join(` `),
  }));
}
