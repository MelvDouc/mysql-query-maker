import { deleteFrom } from "$/index.js";
import { expect } from "chai";
import { test } from "node:test";

test("Simple delete", () => {
  const statement = deleteFrom("table1")
    .where("id > 3")
    .getSql();
  expect(statement).to.equal("DELETE FROM table1\nWHERE id > 3");
});

test("Delete with params", () => {
  const statement = deleteFrom("table1")
    .where("id > :max_id")
    .getSql({ max_id: 3 });
  expect(statement).to.equal("DELETE FROM table1\nWHERE id > 3");
});

test("Delete using", () => {
  const statement = deleteFrom("table1, table2")
    .using("table1")
    .join("table2", "table2.id = table1.t2_id")
    .getSql();
  const expected = "DELETE FROM table1, table2\n"
    + "USING table1\n"
    + "JOIN table2 ON table2.id = table1.t2_id";
  expect(statement).to.equal(expected);
});