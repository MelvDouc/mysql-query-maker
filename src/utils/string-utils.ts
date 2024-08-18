import type { SqlRecord, SqlScalar } from "$/types.js";

const DOUBLE_QUOTE = "\"";
const paramRegex = /:(\w+)/g;

export function doubleQuote(input: string) {
  return DOUBLE_QUOTE + input + DOUBLE_QUOTE;
}

export function parenthesize(input: string) {
  return "(" + input + ")";
}

function formatString(input: string) {
  return doubleQuote(input.replaceAll(DOUBLE_QUOTE, '\\"'));
}

export function formatValue(value: SqlScalar) {
  return typeof value === "string"
    ? formatString(value)
    : String(value);
}

export function addParams(input: string, params: SqlRecord) {
  return input.replace(paramRegex, (_, key) => {
    return (key in params)
      ? formatValue(params[key])
      : key;
  });
}