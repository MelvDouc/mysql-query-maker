import LimitableStatementBuilder from "$/statements/limitable/LimitableStatementBuilder.js";
import type { SqlRecord } from "$/types.js";

export default class UpdateStatementBuilder extends LimitableStatementBuilder {
  private readonly _updates: Record<string, string> = {};
  declare private _where: string;

  /**
   * @param column The table column to update.
   * @param value Either a placeholder like `:id` or raw SQL code like `col1 + 1`.
   */
  public set(column: string, value: string) {
    this._updates[column] = value;
    return this;
  }

  public where(condition: string) {
    this._where = condition;
    return this;
  }

  public getSql(params: SqlRecord = {}) {
    const stringBuilder = this._createStringBuilder("UPDATE $0", this._table);
    stringBuilder.addLine("SET");
    stringBuilder.addLine(this._getUpdates(params));

    if (this._where)
      stringBuilder.addLine("WHERE $0", this._addParams(this._where, params));

    if (this._orderBy.length > 0)
      stringBuilder.addLine("ORDER BY $0", this._orderBy.join(", "));

    if (this._limit > 0)
      stringBuilder.addLine("LIMIT $0", this._limit.toString());

    return stringBuilder.getOutput();
  }

  private _getUpdates(params: SqlRecord) {
    return Object.entries(this._updates)
      .map(([column, value]) => `  ${column} = ${this._addParams(value, params)}`)
      .join(",\n");
  }
}