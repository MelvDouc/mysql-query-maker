import type Constraint from "$/constraints/Constraint.js";
import ForeignKeyConstraint from "$/constraints/ForeignKeyConstraint.js";
import UniqueContraint from "$/constraints/UniqueContraint.js";
import Column from "$/statements/create-table/Column.js";
import StatementBuilder from "$/statements/StatementBuilder.js";

export default class CreateTableStatementBuilder extends StatementBuilder {
  private _temporary = false;
  private _ifNotExists = false;
  private _primaryKey: string = "";
  private readonly _columns: Column[] = [];
  private readonly _constraints: Constraint[] = [];

  public constructor(table: string) {
    super(table);
  }

  public temporary(): this {
    this._temporary = true;
    return this;
  }

  public ifNotExists(): this {
    this._ifNotExists = true;
    return this;
  }

  public primaryKey(value: string): this {
    this._primaryKey = value;
    return this;
  }

  public column(name: string, params: { type: string, nullable?: boolean, defaultValue?: string; }): this {
    this._columns.push(new Column(name, params.type, !!params.nullable, params.defaultValue));
    return this;
  }

  public unique(constraintName: string, column: string): this {
    this._constraints.push(new UniqueContraint(constraintName, column));
    return this;
  }

  public foreignKey(constraintName: string, column: string, foreignTable: string, foreignColumn: string): this {
    this._constraints.push(
      new ForeignKeyConstraint(constraintName, column, foreignTable, foreignColumn)
    );
    return this;
  }

  public getSql(): string {
    const stringBuilder = this._createStringBuilder("CREATE $0", this._temporary ? "TEMPORARY TABLE" : "TABLE");

    if (this._ifNotExists)
      stringBuilder.add(" IF NOT EXISTS");

    stringBuilder.add(" $0 (", this._table);
    stringBuilder.addLine(this._getColumns());
    stringBuilder.addLine(")");
    return stringBuilder.getOutput();
  }

  public getDeleteSql(): { dropForeignKeys: string[]; dropTable: string; } {
    const dropForeignKeys = this._constraints.reduce((acc, constraint) => {
      if (constraint instanceof ForeignKeyConstraint)
        acc.push(constraint.toDropConstraintString(this._table));
      return acc;
    }, [] as string[]);
    return {
      dropForeignKeys,
      dropTable: `DROP TABLE ${this._table}`
    };
  }

  private _getColumns(): string {
    const columns = this._columns.map((column) => column.toString());
    this._constraints.forEach((constraint) => columns.push(constraint.toString()));

    if (this._primaryKey)
      columns.push(`PRIMARY KEY (${this._primaryKey})`);

    return columns.map((c) => "  " + c).join(",\n");
  }
}