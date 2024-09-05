import type { SqlRecord, SqlScalar } from "$/types.js";

const DOUBLE_QUOTE = '"';

export function createReplacer<T>(regex: RegExp, replacer: (arg0: T, ...substrings: string[]) => string): (input: string, arg0: T) => string {
  return (input: string, arg0: T) => input.replace(regex, (...substrings) => replacer(arg0, ...substrings));
}

export function doubleQuote(input: string): string {
  return DOUBLE_QUOTE + input + DOUBLE_QUOTE;
}

export function parenthesize(input: string): string {
  return "(" + input + ")";
}

function formatString(input: string): string {
  return doubleQuote(input.replaceAll(DOUBLE_QUOTE, '\\"'));
}

export function formatValue(value: SqlScalar): string {
  return typeof value === "string"
    ? formatString(value)
    : String(value);
}

export const addParams = createReplacer(/:(\w+)/g, (params: SqlRecord, _, key) => {
  return (key in params) ? formatValue(params[key]) : key;
});

export function joinAlias(input: string, alias?: string): string {
  return alias ? `${input} ${alias}` : input;
}