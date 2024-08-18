import { jsonObject } from "$/index.js";
import { expect } from "chai";
import { test } from "node:test";

test("jsonObject", () => {
  const result = jsonObject({
    id: "t1.id",
    address: jsonObject({
      street: "t1.street",
      zipCode: "t1.zip_code"
    })
  });
  const nested = 'JSON_OBJECT("street", t1.street, "zipCode", t1.zip_code)';
  expect(result).to.equal(`JSON_OBJECT("id", t1.id, "address", ${nested})`);
});