export default class JoinTrait {
  private static join(joins: string[], table: string, onCondition = "", direction = ""): void {
    let output = `JOIN ${table}`;
    if (direction)
      output = `${direction} ${output}`;
    if (onCondition)
      output += ` ON ${onCondition}`;
    joins.push(output);
  }

  declare protected readonly _joins: string[];

  public join(table: string, onCondition = ""): this {
    JoinTrait.join(this._joins, table, onCondition);
    return this;
  }

  public leftJoin(table: string, onCondition = ""): this {
    JoinTrait.join(this._joins, table, onCondition, "LEFT");
    return this;
  }

  public innerJoin(table: string, onCondition = ""): this {
    JoinTrait.join(this._joins, table, onCondition, "INNER");
    return this;
  }

  public rightJoin(table: string, onCondition = ""): this {
    JoinTrait.join(this._joins, table, onCondition, "RIGHT");
    return this;
  }
}