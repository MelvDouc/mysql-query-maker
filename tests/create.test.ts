import { createTable } from "$/index.js";
import { expect } from "chai";
import { test } from "node:test";

test("create table", () => {
  const statement = createTable("book")
    .column("id", { type: "INT AUTO_INCREMENT", nullable: false })
    .column("title", { type: "TEXT" })
    .column("published_year", { type: "INT" })
    .primaryKey("id")
    .getSql();
  const expected = "CREATE TABLE book ("
    + "\n  id INT AUTO_INCREMENT NOT NULL,"
    + "\n  title TEXT NOT NULL,"
    + "\n  published_year INT NOT NULL,"
    + "\n  PRIMARY KEY (id)"
    + "\n)";
  expect(statement).to.equal(expected);
});