export default class FilterTrait {
  declare protected _where: string;

  public where(condition: string): this {
    this._where = condition;
    return this;
  }
}