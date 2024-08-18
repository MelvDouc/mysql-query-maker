import StatementBuilder from "$/statements/StatementBuilder.js";

export default abstract class LimitableStatementBuilder extends StatementBuilder {
  protected readonly _orderBy: string[] = [];
  protected _limit = 0;

  public orderBy(...columns: string[]) {
    this._orderBy.push(...columns);
    return this;
  }

  public limit(limit: number) {
    this._limit = limit;
    return this;
  }
}