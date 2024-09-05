import type { SqlRecord } from "$/types.js";
import { addParams, joinAlias } from "$/utils/string-utils.js";
import StringBuilder from "$/utils/StringBuilder.js";

export default abstract class StatementBuilder {
  protected readonly _table: string;

  public constructor(table: string, alias?: string) {
    this._table = joinAlias(table, alias);
  }

  public abstract getSql(params?: SqlRecord): string;

  protected _createStringBuilder(start: string, ...params: string[]): StringBuilder {
    return new StringBuilder(start, ...params);
  }

  protected _addParams(input: string, params: SqlRecord): string {
    return addParams(input, params);
  }
}