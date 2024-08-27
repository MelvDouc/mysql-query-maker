import StatementBuilder from "$/statements/StatementBuilder.js";
import FilterTrait from "$/traits/FilterTrait.js";
import JoinTrait from "$/traits/JoinTrait.js";
import LimitableTrait from "$/traits/LimitableTrait.js";
import OrderableTrait from "$/traits/OrderableTrait.js";
import type { SqlRecord } from "$/types.js";
import { UseTraits } from "class-traits";

interface DeleteStatementBuilder extends JoinTrait, FilterTrait, LimitableTrait, OrderableTrait { }

@UseTraits(JoinTrait, FilterTrait, LimitableTrait, OrderableTrait)
class DeleteStatementBuilder extends StatementBuilder {
  private _using = "";
  protected _where = "";
  protected readonly _joins: string[] = [];
  protected readonly _orderBy: string[] = [];
  protected _limit = 0;

  public using(using: string) {
    this._using = using;
    return this;
  }

  private _isMultiTable() {
    return this._using !== "";
  }

  public getSql(params: SqlRecord = {}) {
    const stringBuilder = this._createStringBuilder("DELETE FROM $0", this._table);

    if (this._isMultiTable()) {
      stringBuilder.addLine("USING $0", this._using);
      this._joins.forEach((join) => stringBuilder.addLine(join));
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

export default DeleteStatementBuilder;