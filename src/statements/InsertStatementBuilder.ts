import StatementBuilder from "$/statements/StatementBuilder.js";
import type { SqlRecord, SqlScalar } from "$/types.js";
import { formatValue, parenthesize } from "$/utils/string-utils.js";

export default class InsertStatementBuilder extends StatementBuilder {
  private readonly _columns: string[] = [];
  private readonly _values: string[][] = [];
  private _alias = "";
  private _onDuplicateKeyUpdate = "";

  public constructor(table: string) {
    super(table);
  }

  public columns(columns: string[]): this {
    this._columns.push(...columns);
    return this;
  }

  public value(value: SqlScalar[]): this {
    this._values.push(value.map(formatValue));
    return this;
  }

  public values(values: SqlScalar[][]): this {
    values.forEach((item) => this.value(item));
    return this;
  }

  public valueDictionary(valueDict: SqlRecord): this {
    this._values.push(this._convertValueDictionary(valueDict));
    return this;
  }

  public valueDictionaries(valueDicts: SqlRecord[]): this {
    valueDicts.forEach((item) => this.valueDictionary(item));
    return this;
  }

  private _convertValueDictionary(valueDict: SqlRecord): string[] {
    return this._columns.map((column) => formatValue(valueDict[column]));
  }

  public as(alias: string): this {
    this._alias = alias;
    return this;
  }

  public onDuplicateKeyUpdate(assignmentList: string): this {
    this._onDuplicateKeyUpdate = assignmentList;
    return this;
  }

  public getSql(): string {
    const stringBuilder = this._createStringBuilder("INSERT INTO $0 ($1)", this._table, this._columns.join(", "));
    stringBuilder.addLine("VALUES");
    stringBuilder.addLine("$0", this._joinValues());

    if (this._alias)
      stringBuilder.addLine("AS $0", this._alias);

    if (this._onDuplicateKeyUpdate)
      stringBuilder.addLine("ON DUPLICATE KEY UPDATE $0", this._onDuplicateKeyUpdate);

    return stringBuilder.getOutput();
  }

  private _joinValues(): string {
    return this._values
      .map((item) => parenthesize(item.join(", ")))
      .join(",\n");
  }
}