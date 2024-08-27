function join(joins: string[], table: string, onCondition = "", direction = "") {
  let output = `JOIN ${table}`;
  if (direction)
    output = `${direction} ${output}`;
  if (onCondition)
    output += ` ON ${onCondition}`;
  joins.push(output);
}

export default join;