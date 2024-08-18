export default class PrimaryKey {
  public constructor(
    public readonly name: string,
    public readonly type: string,
    public readonly autoIncrement: boolean
  ) { }

  public toString() {
    let output = `${this.name} ${this.type} PRIMARY KEY`;
    if (this.autoIncrement)
      output += " AUTO_INCREMENT";
    return output;
  }
}