import StatementBuilder from "$/statements/StatementBuilder.js";
import FilterTrait from "$/traits/FilterTrait.js";
import JoinTrait from "$/traits/JoinTrait.js";
import LimitableTrait from "$/traits/LimitableTrait.js";
import OrderableTrait from "$/traits/OrderableTrait.js";
import type { SqlRecord } from "$/types.js";
import { joinAlias } from "$/utils/string-utils.js";
import { UseTraits } from "class-traits";

interface SelectStatementBuilder extends JoinTrait, FilterTrait, LimitableTrait, OrderableTrait { }

@UseTraits(JoinTrait, FilterTrait, LimitableTrait, OrderableTrait)
class SelectStatementBuilder extends StatementBuilder {
  private readonly _columns: string[] = [];
  private readonly _groupBy: string[] = [];
  protected _where = "";
  protected readonly _joins: string[] = [];
  protected readonly _orderBy: string[] = [];
  protected _limit = 0;

  public column(column: string, alias?: string): this {
    this._columns.push(joinAlias(column, alias));
    return this;
  }

  public columnIf(condition: string, valueIfTrue: string, valueIfFalse: string, alias: string): this {
    this._columns.push(`IF(${condition}, ${valueIfTrue}, ${valueIfFalse}) ${alias}`);
    return this;
  }

  public columnIfNull(expression: string, altValue: string, alias: string): this {
    this._columns.push(`IFNULL(${expression}, ${altValue}) ${alias}`);
    return this;
  }

  public groupBy(...columns: string[]): this {
    this._groupBy.push(...columns);
    return this;
  }

  public getSql(params: SqlRecord = {}): string {
    const stringBuilder = this._createStringBuilder("SELECT");
    stringBuilder.addLine(this._columns.join(",\n"));
    stringBuilder.addLine("FROM $0", this._table);

    this._joins.forEach((join) => stringBuilder.addLine(join));

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

export default SelectStatementBuilder;