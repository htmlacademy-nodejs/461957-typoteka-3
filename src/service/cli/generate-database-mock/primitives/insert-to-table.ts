import {TableNames} from "../../constants/table-names.constant";

type TableNameKey = keyof typeof TableNames;
type TableName = typeof TableNames[TableNameKey];

export function insertToTable(table: TableName, values: string[]): string {
  return `INSERT INTO ${table} (${values
    .map(value => `'` + value.replace(/"/g, `\\"`).replace(/'/g, `\\'`) + `'`)
    .toString()})`;
}
