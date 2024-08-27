export default class OrderableTrait {
  declare protected readonly _orderBy: string[];

  public orderBy(...columns: string[]) {
    this._orderBy.push(...columns);
    return this;
  }
}