import { selectFrom } from "$/index.js";
import { expect } from "chai";
import { test } from "node:test";

test("Simple select", () => {
  const statement = selectFrom("table1")
    .column("id")
    .getSql();
  expect(statement).to.equal("SELECT\nid\nFROM table1");
});

test("Default join", () => {
  const statement = selectFrom("table1 t1")
    .column("id")
    .column("name")
    .join("t2", "t2.id = t1.t2_id")
    .innerJoin("t3", "t3.id = t2.id")
    .getSql();
  const expected = "SELECT\n"
    + "id,\n"
    + "name\n"
    + "FROM table1 t1\n"
    + "JOIN t2 ON t2.id = t1.t2_id\n"
    + "INNER JOIN t3 ON t3.id = t2.id";
  expect(statement).to.equal(expected);
});

test("Select with params", () => {
  const statement = selectFrom("table1")
    .column("*")
    .where("id = :id")
    .getSql({ id: 2 });
  expect(statement).to.equal("SELECT\n*\nFROM table1\nWHERE id = 2");
});

test("String escaping", () => {
  const statement = selectFrom("table1")
    .column("*")
    .where("name = :name")
    .getSql({ name: '"' });
  expect(statement).to.equal('SELECT\n*\nFROM table1\nWHERE name = "\\""');
});