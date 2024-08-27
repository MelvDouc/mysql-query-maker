export default class Column {
  public constructor(
    public readonly name: string,
    public readonly type: string,
    public readonly nullable: boolean,
    public readonly defaultValue?: string
  ) { }

  public toString() {
    let output = `${this.name} ${this.type}`;
    if (!this.nullable)
      output += " NOT NULL";
    if (this.defaultValue !== undefined)
      output += ` DEFAULT ${this.defaultValue}`;
    return output;
  }
}