import { joinSymbol } from "$/utils/symbols.js";

function createJoinFn<T extends { [joinSymbol]: string[]; }>(source: T) {
  const main = (table: string, onCondition = "", direction = "") => {
    let output = `JOIN ${table}`;
    if (direction)
      output = `${direction} ${output}`;
    if (onCondition)
      output += ` ON ${onCondition}`;
    source[joinSymbol].push(output);
    return source;
  };

  const join = (table: string, onCondition?: string) => main(table, onCondition);
  join.inner = (table: string, onCondition?: string) => main(table, onCondition, "INNER");
  join.left = (table: string, onCondition?: string) => main(table, onCondition, "LEFT");
  join.right = (table: string, onCondition?: string) => main(table, onCondition, "RIGHT");

  return join;
}

export { createJoinFn, joinSymbol };
