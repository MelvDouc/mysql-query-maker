import Constraint from "$/constraints/Constraint.js";

export default class ForeignKeyConstraint extends Constraint {
  protected readonly _name: string;
  protected readonly _column: string;
  private readonly _foreignTable: string;
  private readonly _foreignColumn: string;

  public constructor(name: string, column: string, foreignTable: string, foreignColumn: string) {
    super();
    this._name = name;
    this._column = column;
    this._foreignTable = foreignTable;
    this._foreignColumn = foreignColumn;
  }

  public toString() {
    return `CONSTRAINT ${this._name} FOREIGN KEY (${this._column}) REFERENCES ${this._foreignTable} (${this._foreignColumn})`;
  }
}