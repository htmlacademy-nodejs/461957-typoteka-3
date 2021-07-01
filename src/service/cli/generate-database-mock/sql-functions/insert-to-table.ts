import {TableName} from "../../../server/data-access/constants/table-name";
import {SQL_KEYWORDS} from "../constants/sql-keywords.constant";

type TableNameKey = keyof typeof TableName;
type TableName = typeof TableName[TableNameKey];

function insertToTable(table: TableName, values: string[]): string {
  const message = values.map(value => (SQL_KEYWORDS.includes(value) ? value : escapeString(value)));
  return `INSERT INTO ${table} VALUES (${message.toString()});\n`;
}

function escapeString(message: string): string {
  return `'${message.replace(/"/g, `\\"`).replace(/'/g, `\\'`)}'`;
}

export {
  insertToTable,
};
