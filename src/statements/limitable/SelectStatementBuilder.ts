import LimitableStatementBuilder from "$/statements/limitable/LimitableStatementBuilder.js";
import type { SqlRecord } from "$/types.js";
import { createJoinFn, joinSymbol } from "$/utils/join.js";

export default class SelectStatementBuilder extends LimitableStatementBuilder {
  private readonly _columns: string[] = [];
  private readonly _groupBy: string[] = [];
  private _where = "";
  public readonly [joinSymbol]: string[] = [];
  public readonly join = createJoinFn<SelectStatementBuilder>(this);

  public column(column: string) {
    this._columns.push(column);
    return this;
  }

  public columnIf(condition: string, valueIfTrue: string, valueIfFalse: string, alias: string) {
    this._columns.push(`IF(${condition}, ${valueIfTrue}, ${valueIfFalse}) ${alias}`);
    return this;
  }

  public columnIfNull(expression: string, altValue: string, alias: string) {
    this._columns.push(`IFNULL(${expression}, ${altValue}) ${alias}`);
    return this;
  }

  public where(condition: string) {
    this._where = condition;
    return this;
  }

  public groupBy(...columns: string[]) {
    this._groupBy.push(...columns);
    return this;
  }

  public getSql(params: SqlRecord = {}) {
    const stringBuilder = this._createStringBuilder("SELECT $0", this._columns.join(", "));
    stringBuilder.addLine("FROM $0", this._table);

    this[joinSymbol].forEach((join) => stringBuilder.addLine(join));

    if (this._where)
      stringBuilder.addLine("WHERE $0", this._addParams(this._where, params));

    if (this._groupBy.length > 0)
      stringBuilder.addLine("GROUP BY $0", this._groupBy.join(", "));

    if (this._orderBy.length > 0)
      stringBuilder.addLine("ORDER BY $0", this._orderBy.join(", "));

    if (this._limit > 0)
      stringBuilder.addLine("LIMIT $0", this._limit.toString());

    return stringBuilder.getOutput();
  }
}