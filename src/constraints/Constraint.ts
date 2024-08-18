export default abstract class Constraint {
  protected abstract readonly _name: string;
  protected abstract readonly _column: string;
}