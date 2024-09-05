import { createReplacer } from "$/utils/string-utils.js";

export default class StringBuilder {
  private static _format = createReplacer(/\$(\d+)/g, (params: string[], _, index) => params[+index]);

  private _output: string;

  public constructor(start: string, ...params: string[]) {
    this._output = StringBuilder._format(start, params);
  }

  public add(text: string, ...params: string[]): void {
    this._output += StringBuilder._format(text, params);
  }

  public addLine(line: string, ...params: string[]): void {
    this._output += "\n" + StringBuilder._format(line, params);
  }

  public getOutput(): string {
    return this._output;
  }
}