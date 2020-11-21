import yargs from "yargs/yargs";
import {ICLIArguments} from "./generate-database-mock/models/cli-arguments.interface";
import {insertToTable} from "./generate-database-mock/sql-functions/insert-to-table";
import {appendToFile} from "./generate-database-mock/fs-functions/append-to-file";
import {readTXTFile} from "./generate";
import {MockFilePath, MockTextsFilePath, TableNames} from "../../constants-es6";

function getCliArguments(): ICLIArguments {
  return yargs(process.argv.slice(2)).options({
    database: {type: `string`, demandOption: true, desc: `Database name`},
    user: {type: `string`, demandOption: true, desc: `User who has access to database`},
    number: {type: `number`, desc: `Number of generated articles`, default: 3},
  }).argv as ICLIArguments;
}

getCliArguments();

async function init(): Promise<void> {
  const params: ICLIArguments = getCliArguments();
  await insertCategories();
  await insertPermissions();
}

async function insertCategories(): Promise<void> {
  await appendToFile(MockFilePath.FILL_DATABASE_SQL_SCRIPT, `-- CATEGORIES\n`);
  const categories = await readTXTFile(MockTextsFilePath.CATEGORIES);
  for (const category of categories) {
    const fillTableCategories = insertToTable(TableNames.CATEGORIES, [category]);
    await appendToFile(MockFilePath.FILL_DATABASE_SQL_SCRIPT, fillTableCategories);
  }
  await appendToFile(MockFilePath.FILL_DATABASE_SQL_SCRIPT, `\n`);
}

async function insertPermissions(): Promise<void> {
  await appendToFile(MockFilePath.FILL_DATABASE_SQL_SCRIPT, `-- PERMISSIONS\n`);
  const permissions = await readTXTFile(MockTextsFilePath.PERMISSIONS);
  for (const permission of permissions) {
    const fillTablePermissions = insertToTable(TableNames.PERMISSIONS, [permission]);
    await appendToFile(MockFilePath.FILL_DATABASE_SQL_SCRIPT, fillTablePermissions);
  }
  await appendToFile(MockFilePath.FILL_DATABASE_SQL_SCRIPT, `\n`);
}

void init();
