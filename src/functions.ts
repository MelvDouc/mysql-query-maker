import JsonObject from "$/sql-functions/JsonObject.js";
import CreateTableStatementBuilder from "$/statements/create-table/CreateTableStatementBuilder.js";
import DeleteStatementBuilder from "$/statements/DeleteStatementBuilder.js";
import InsertStatementBuilder from "$/statements/InsertStatementBuilder.js";
import SelectStatementBuilder from "$/statements/SelectStatementBuilder.js";
import UpdateStatementBuilder from "$/statements/UpdateStatementBuilder.js";
import type { StringRecord } from "$/types.js";

export function selectFrom(table: string, alias?: string) {
  return new SelectStatementBuilder(table, alias);
}

export function insertInto(table: string) {
  return new InsertStatementBuilder(table);
}

export function update(table: string, alias?: string) {
  return new UpdateStatementBuilder(table, alias);
}

export function deleteFrom(table: string, alias?: string) {
  return new DeleteStatementBuilder(table, alias);
}

export function createTable(table: string) {
  return new CreateTableStatementBuilder(table);
}

export function jsonObject(entries: StringRecord = {}) {
  return new JsonObject(entries);
}