export default class LimitableTrait {
  declare protected _limit: number;

  public limit(limit: number): this {
    this._limit = limit;
    return this;
  }
}