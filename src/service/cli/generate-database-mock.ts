import yargs from "yargs/yargs";
import {ICLIArguments} from "./generate-database-mock/models/cli-arguments.interface";
import {insertToTable} from "./generate-database-mock/sql-functions/insert-to-table";
import {appendToFile} from "./generate-database-mock/fs-functions/append-to-file";
import {getAnnounce, getDate, getFullText, getTitle, readTXTFile} from "./generate";
import {MockFilePath, MockTextsFilePath, TableNames} from "../../constants-es6";
import {shuffle} from "../../utils";
import {truncateFile} from "./generate-database-mock/fs-functions/trunctate-file";
import chalk from "chalk";

function getCliArguments(): ICLIArguments {
  return yargs(process.argv.slice(2)).options({
    database: {type: `string`, demandOption: true, desc: `Database name`},
    user: {type: `string`, demandOption: true, desc: `User who has access to database`},
    number: {type: `number`, desc: `Number of generated users`, default: 3},
  }).argv as ICLIArguments;
}

getCliArguments();

async function init(): Promise<void> {
  const params: ICLIArguments = getCliArguments();
  await truncateFile(MockFilePath.FILL_DATABASE_SQL_SCRIPT);
  await insertCategories();
  await insertPermissions();
  await insertUsers(params.number);
  await insertArticles(params.number);
}

async function insertCategories(): Promise<void> {
  await appendToFile(MockFilePath.FILL_DATABASE_SQL_SCRIPT, `-- CATEGORIES\n`);
  const categories = await readTXTFile(MockTextsFilePath.CATEGORIES);
  for (const category of categories) {
    const fillTableCategories = insertToTable(TableNames.CATEGORIES, [`DEFAULT`, category]);
    await appendToFile(MockFilePath.FILL_DATABASE_SQL_SCRIPT, fillTableCategories);
  }
  await appendToFile(MockFilePath.FILL_DATABASE_SQL_SCRIPT, `\n`);
  console.log(chalk.green(`CATEGORIES: scripts generated successfully`));
}

async function insertPermissions(): Promise<void> {
  await appendToFile(MockFilePath.FILL_DATABASE_SQL_SCRIPT, `-- PERMISSIONS\n`);
  const permissions = await readTXTFile(MockTextsFilePath.PERMISSIONS);
  for (const permission of permissions) {
    const fillTablePermissions = insertToTable(TableNames.PERMISSIONS, [permission]);
    await appendToFile(MockFilePath.FILL_DATABASE_SQL_SCRIPT, fillTablePermissions);
  }
  await appendToFile(MockFilePath.FILL_DATABASE_SQL_SCRIPT, `\n`);
  console.log(chalk.green(`PERMISSIONS: scripts generated successfully`));
}

async function insertUsers(usersNumber: number): Promise<void> {
  await appendToFile(MockFilePath.FILL_DATABASE_SQL_SCRIPT, `-- USERS\n`);
  const [firstNames, lastNames, emails, permissions] = await Promise.all(
    [
      MockTextsFilePath.FIRST_NAMES,
      MockTextsFilePath.LAST_NAMES,
      MockTextsFilePath.EMAILS,
      MockTextsFilePath.PERMISSIONS,
    ].map(file => readTXTFile(file)),
  );
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

async function insertArticles(userNumber: number): Promise<void> {
  await appendToFile(MockFilePath.FILL_DATABASE_SQL_SCRIPT, `-- ARTICLES\n`);
  const [titles, sentences] = await Promise.all(
    [
      MockTextsFilePath.TITLES,
      MockTextsFilePath.SENTENCES,
    ].map(file => readTXTFile(file)),
  );
  const articles = new Array(userNumber).fill(undefined).map((article, index) => {

    return [
      `DEFAULT`,
      getTitle(titles),
      getDate(Date.now()).toISOString(),
      (index + 1).toString(10),
      getFullText(sentences),
      `NULL`,
      getAnnounce(sentences),
    ];
  });

  for (const article of articles) {
    const fillTableArticles = insertToTable(TableNames.ARTICLES, article);
    await appendToFile(MockFilePath.FILL_DATABASE_SQL_SCRIPT, fillTableArticles);
  }
  await appendToFile(MockFilePath.FILL_DATABASE_SQL_SCRIPT, `\n`);
  console.log(chalk.green(`ARTICLES: scripts generated successfully`));
}

void init();
