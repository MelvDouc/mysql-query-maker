import LimitableStatementBuilder from "$/statements/limitable/LimitableStatementBuilder.js";
import type { SqlRecord } from "$/types.js";
import { createJoinFn, joinSymbol } from "$/utils/join.js";

export default class DeleteStatementBuilder extends LimitableStatementBuilder {
  private _using = "";
  private _where = "";
  public readonly [joinSymbol]: string[] = [];
  public readonly join = createJoinFn<DeleteStatementBuilder>(this);

  public using(using: string) {
    this._using = using;
    return this;
  }

  public where(condition: string) {
    this._where = condition;
    return this;
  }

  private _isMultiTable() {
    return this._using !== "";
  }

  public getSql(params: SqlRecord = {}) {
    const stringBuilder = this._createStringBuilder("DELETE FROM $0", this._table);

    if (this._isMultiTable()) {
      stringBuilder.addLine("USING $0", this._using);
      this[joinSymbol].forEach((join) => stringBuilder.addLine(join));
    }

    if (this._where)
      stringBuilder.addLine("WHERE $0", this._addParams(this._where, params));

    if (this._orderBy.length > 0)
      stringBuilder.addLine("ORDER BY $0", this._orderBy.join(", "));

    if (this._limit > 0)
      stringBuilder.addLine("LIMIT $0", this._limit.toString());

    return stringBuilder.getOutput();
  }
}