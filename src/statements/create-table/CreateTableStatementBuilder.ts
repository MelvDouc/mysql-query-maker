import type Constraint from "$/constraints/Constraint.js";
import ForeignKeyConstraint from "$/constraints/ForeignKeyConstraint.js";
import UniqueContraint from "$/constraints/UniqueContraint.js";
import Column from "$/statements/create-table/Column.js";
import PrimaryKey from "$/statements/create-table/PrimaryKey.js";
import StatementBuilder from "$/statements/StatementBuilder.js";

export default class CreateTableStatementBuilder extends StatementBuilder {
  private _temporary = false;
  private _ifNotExists = false;
  private _primaryKey: PrimaryKey | null = null;
  private readonly _columns: Column[] = [];
  private readonly _constraints: Constraint[] = [];

  public temporary() {
    this._temporary = true;
    return this;
  }

  public ifNotExists() {
    this._ifNotExists = true;
    return this;
  }

  public primaryKey(name: string, type: string, autoIncrement?: boolean) {
    this._primaryKey = new PrimaryKey(name, type, !!autoIncrement);
    return this;
  }

  public column(name: string, params: { type: string, nullable?: boolean, defaultValue?: string; }) {
    this._columns.push(new Column(name, params.type, !!params.nullable, params.defaultValue));
    return this;
  }

  public unique(constraintName: string, column: string) {
    this._constraints.push(new UniqueContraint(constraintName, column));
    return this;
  }

  public foreignKey(constraintName: string, column: string, foreignTable: string, foreignColumn: string) {
    this._constraints.push(
      new ForeignKeyConstraint(constraintName, column, foreignTable, foreignColumn)
    );
    return this;
  }

  public getSql() {
    const stringBuilder = this._createStringBuilder("CREATE $0", this._temporary ? "TEMPORARY TABLE" : "TABLE");

    if (this._ifNotExists)
      stringBuilder.add(" IF NOT EXISTS");

    stringBuilder.add(" $0 (", this._table);
    stringBuilder.addLine(this._getColumns());
    stringBuilder.addLine(")");
    return stringBuilder.getOutput();
  }

  private _getColumns() {
    const columns: string[] = [];

    if (this._primaryKey)
      columns.push(this._primaryKey.toString());

    this._columns.forEach((column) => columns.push(column.toString()));
    this._constraints.forEach((constraint) => columns.push(constraint.toString()));
    return columns.map((c) => "  " + c).join(",\n");
  }
}