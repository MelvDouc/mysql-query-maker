import Constraint from "$/constraints/Constraint.js";

export default class UniqueContraint extends Constraint {
  protected readonly _name: string;
  protected readonly _column: string;

  public constructor(name: string, column: string) {
    super();
    this._name = name;
    this._column = column;
  }

  public toString() {
    return `CONSTRAINT ${this._name} UNIQUE (${this._column})`;
  }
}