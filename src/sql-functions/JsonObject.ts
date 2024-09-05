import type { StringRecord } from "$/types.js";
import { doubleQuote } from "$/utils/string-utils.js";

export default class JsonObject {
  private readonly _entries: StringRecord;

  public constructor(entries: StringRecord) {
    this._entries = entries;
  }

  public hasEntry(key: string) {
    return key in this._entries;
  }

  public addEntry(key: string, column: string): this {
    this._entries[key] = column;
    return this;
  }

  public removeEntry(key: string): boolean {
    const isInEntries = this.hasEntry(key);
    delete this._entries[key];
    return isInEntries;
  }

  public getOutput(): string {
    const sqlArgs = Object.entries(this._entries)
      .map(([key, column]) => `${doubleQuote(key)}, ${column}`)
      .join(", ");
    return `JSON_OBJECT(${sqlArgs})`;
  }

  public toString(): string {
    return this.getOutput();
  }
}