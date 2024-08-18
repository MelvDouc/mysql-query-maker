import type { SqlRecord } from "$/types.js";
import { addParams } from "$/utils/string-utils.js";
import StringBuilder from "$/utils/StringBuilder.js";

export default abstract class StatementBuilder {
  public constructor(
    protected readonly _table: string
  ) { }

  public abstract getSql(params?: SqlRecord): string;

  protected _createStringBuilder(start: string, ...params: string[]) {
    return new StringBuilder(start, ...params);
  }

  protected _addParams(input: string, params: SqlRecord) {
    return addParams(input, params);
  }
}