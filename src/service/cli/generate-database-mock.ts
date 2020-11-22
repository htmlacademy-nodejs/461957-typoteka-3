import yargs from "yargs/yargs";
import {ICLIArguments} from "./generate-database-mock/models/cli-arguments.interface";
import {insertToTable} from "./generate-database-mock/sql-functions/insert-to-table";
import {appendToFile} from "./generate-database-mock/fs-functions/append-to-file";
import {
  getAnnounce,
  getCommentText,
  getDate,
  getFullText,
  getTitle,
} from "./generate-database-mock/values-generators";
import {MockFilePath, MockTextsFilePath, TableNames} from "../../constants-es6";
import {getRandomInt, shuffle} from "../../utils";
import {truncateFile} from "./generate-database-mock/fs-functions/trunctate-file";
import chalk from "chalk";
import {readTXTFile} from "./generate-database-mock/fs-functions/read-txt-file";
import {CategoriesRestrict} from "./generate-database-mock/constants/mocks-restrictions";

function getCliArguments(): ICLIArguments {
  return yargs(process.argv.slice(2)).options({
    database: {type: `string`, demandOption: true, desc: `Database name`},
    user: {type: `string`, demandOption: true, desc: `User who has access to database`},
    number: {type: `number`, desc: `Number of generated users`, default: 3},
  }).argv as ICLIArguments;
}

async function init(): Promise<void> {
  const params: ICLIArguments = getCliArguments();
  const [firstNames, lastNames, emails, permissions, categories, sentences, comments, titles] = await loadSources([
    MockTextsFilePath.FIRST_NAMES,
    MockTextsFilePath.LAST_NAMES,
    MockTextsFilePath.EMAILS,
    MockTextsFilePath.PERMISSIONS,
    MockTextsFilePath.CATEGORIES,
    MockTextsFilePath.SENTENCES,
    MockTextsFilePath.COMMENTS,
    MockTextsFilePath.TITLES,
  ]);

  await truncateFile(MockFilePath.FILL_DATABASE_SQL_SCRIPT);
  await insertCategories(categories);
  await insertPermissions(permissions);
  await insertUsers(params.number, firstNames, lastNames, emails, permissions);
  await insertArticles(params.number, titles, sentences);
  await insertComments(params.number, comments);
  await insertArticlesCategories(params.number, categories.length);
}

async function loadSources(filePaths: string[]): Promise<string[][]> {
  return Promise.all(filePaths.map(readTXTFile));
}

async function insertCategories(categoriesSrc: string[]): Promise<void> {
  await appendToFile(MockFilePath.FILL_DATABASE_SQL_SCRIPT, `-- CATEGORIES\n`);
  for (const category of categoriesSrc) {
    const fillTableCategories = insertToTable(TableNames.CATEGORIES, [`DEFAULT`, category]);
    await appendToFile(MockFilePath.FILL_DATABASE_SQL_SCRIPT, fillTableCategories);
  }
  await appendToFile(MockFilePath.FILL_DATABASE_SQL_SCRIPT, `\n`);
  console.log(chalk.green(`CATEGORIES: scripts generated successfully`));
}

async function insertPermissions(permissionsSrc: string[]): Promise<void> {
  await appendToFile(MockFilePath.FILL_DATABASE_SQL_SCRIPT, `-- PERMISSIONS\n`);
  for (const permission of permissionsSrc) {
    const fillTablePermissions = insertToTable(TableNames.PERMISSIONS, [permission]);
    await appendToFile(MockFilePath.FILL_DATABASE_SQL_SCRIPT, fillTablePermissions);
  }
  await appendToFile(MockFilePath.FILL_DATABASE_SQL_SCRIPT, `\n`);
  console.log(chalk.green(`PERMISSIONS: scripts generated successfully`));
}

async function insertUsers(
  usersNumber: number,
  firstNames: string[],
  lastNames: string[],
  emails: string[],
  permissions: string[],
): Promise<void> {
  await appendToFile(MockFilePath.FILL_DATABASE_SQL_SCRIPT, `-- USERS\n`);
  const selectedFirstNames = shuffle(firstNames).slice(0, usersNumber);
  const users = selectedFirstNames.reduce((accumulator, firstName) => {
    accumulator.push([`DEFAULT`, shuffle(emails)[0], permissions[0], firstName, shuffle(lastNames)[0], `NULL`]);
    return accumulator;
  }, [] as string[][]);
  for (const user of users) {
    const fillTableUsers = insertToTable(TableNames.USERS, user);
    await appendToFile(MockFilePath.FILL_DATABASE_SQL_SCRIPT, fillTableUsers);
  }
  await appendToFile(MockFilePath.FILL_DATABASE_SQL_SCRIPT, `\n`);
  console.log(chalk.green(`USERS: scripts generated successfully`));
}

async function insertArticles(userNumber: number, titlesSrc: string[], sentencesSrc: string[]): Promise<void> {
  await appendToFile(MockFilePath.FILL_DATABASE_SQL_SCRIPT, `-- ARTICLES\n`);
  const articles = new Array(userNumber)
    .fill(undefined)
    .map((article, index) => [
      `DEFAULT`,
      getTitle(titlesSrc),
      getDate(Date.now()).toISOString(),
      (index + 1).toString(10),
      getFullText(sentencesSrc),
      `NULL`,
      getAnnounce(sentencesSrc),
    ]);
  for (const article of articles) {
    const fillTableArticles = insertToTable(TableNames.ARTICLES, article);
    await appendToFile(MockFilePath.FILL_DATABASE_SQL_SCRIPT, fillTableArticles);
  }
  await appendToFile(MockFilePath.FILL_DATABASE_SQL_SCRIPT, `\n`);
  console.log(chalk.green(`ARTICLES: scripts generated successfully`));
}

async function insertComments(userNumber: number, commentsSrc: string[]): Promise<void> {
  await appendToFile(MockFilePath.FILL_DATABASE_SQL_SCRIPT, `-- COMMENTS\n`);
  const generatedComments = new Array(userNumber * 3)
    .fill(undefined)
    .map(() => [
      `DEFAULT`,
      getRandomInt(1, userNumber).toString(10),
      getRandomInt(1, userNumber).toString(10),
      getDate(Date.now()).toISOString(),
      getCommentText(commentsSrc),
    ]);
  for (const comment of generatedComments) {
    const fillTableComments = insertToTable(TableNames.COMMENTS, comment);
    await appendToFile(MockFilePath.FILL_DATABASE_SQL_SCRIPT, fillTableComments);
  }
  await appendToFile(MockFilePath.FILL_DATABASE_SQL_SCRIPT, `\n`);
  console.log(chalk.green(`COMMENTS: scripts generated successfully`));
}

async function insertArticlesCategories(userNumber: number, categoriesNumber: number): Promise<void> {
  await appendToFile(MockFilePath.FILL_DATABASE_SQL_SCRIPT, `-- ARTICLES_CATEGORIES\n`);
  const intersectionMap: [string, string[]][] = new Array(userNumber)
    .fill(undefined)
    .map((value, index) => [
      (index + 1).toString(10),
      generateCategoriesForArticle(categoriesNumber, CategoriesRestrict.min, CategoriesRestrict.max),
    ]);
  for (const pair of unfoldCategoriesMap(intersectionMap)) {
    const fillTableArticlesCategories = insertToTable(TableNames.ARTICLES_CATEGORIES, pair);
    await appendToFile(MockFilePath.FILL_DATABASE_SQL_SCRIPT, fillTableArticlesCategories);
  }
  console.log(chalk.green(`ARTICLES_CATEGORIES: scripts generated successfully`));
}

function generateCategoriesForArticle(categoriesLength: number, min: number, max: number): string[] {
  return [
    ...new Set(
      new Array(getRandomInt(min, max)).fill(undefined).map(() => getRandomInt(1, categoriesLength).toString(10)),
    ),
  ];
}

function unfoldCategoriesMap(intersectionMap: [string, string[]][]): [string, string][] {
  const flatMap: [string, string][] = [];
  intersectionMap.forEach(([article, categories]) => {
    categories.forEach(category => flatMap.push([article, category]));
  });
  return flatMap;
}

void init();
