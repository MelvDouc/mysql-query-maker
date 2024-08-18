export default class StringBuilder {
  private static _format(text: string, params: string[]) {
    return text.replace(/\$(\d+)/g, (_, index) => params[index]);
  }

  private _output: string;

  public constructor(start: string, ...params: string[]) {
    this._output = StringBuilder._format(start, params);
  }

  public add(text: string, ...params: string[]) {
    this._output += StringBuilder._format(text, params);
  }

  public addLine(line: string, ...params: string[]) {
    this._output += "\n" + StringBuilder._format(line, params);
  }

  public getOutput() {
    return this._output;
  }
}