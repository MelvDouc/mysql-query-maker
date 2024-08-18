import CreateTableStatementBuilder from "$/statements/create-table/CreateTableStatementBuilder.js";
import InsertStatementBuilder from "$/statements/InsertStatementBuilder.js";
import DeleteStatementBuilder from "$/statements/limitable/DeleteStatementBuilder.js";
import SelectStatementBuilder from "$/statements/limitable/SelectStatementBuilder.js";
import UpdateStatementBuilder from "$/statements/limitable/UpdateStatementBuilder.js";
import type { StringRecord } from "$/types.js";

export function selectFrom(table: string) {
  return new SelectStatementBuilder(table);
}

export function insertInto(table: string) {
  return new InsertStatementBuilder(table);
}

export function update(table: string) {
  return new UpdateStatementBuilder(table);
}

export function deleteFrom(table: string) {
  return new DeleteStatementBuilder(table);
}

export function createTable(table: string) {
  return new CreateTableStatementBuilder(table);
}

export function jsonObject(entries: StringRecord) {
  const sqlArgs = Object.entries(entries)
    .map(([key, column]) => `"${key}", ${column}`)
    .join(", ");
  return `JSON_OBJECT(${sqlArgs})`;
}