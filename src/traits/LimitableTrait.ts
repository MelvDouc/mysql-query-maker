export default class LimitableTrait {
  declare protected _limit: number;

  public limit(limit: number) {
    this._limit = limit;
    return this;
  }
}