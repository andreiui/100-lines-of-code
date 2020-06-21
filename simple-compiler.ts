const fncts = { sum: '+', dot: '*', div: '/', exp: '**', mod: '%' };

interface Node {
  type: "num" | "fnct" | "expr",
  value: number | string,
  expr?: Array<Node>;
}

function tokenize(line: string): Array<string> {
  return line.split(/(\(|\))/).join(" ").split(" ").filter(each => each.length);
}

function parse(tokens: Array<string>): Node {
  let col = 0;

  const parseNum = (): Node => {
    if (parseFloat(tokens[col])) {
      return { type: "num", value: parseFloat(tokens[col++]) };
    }
    else { throw new Error(`num "${tokens[col]}" is not valid`); }
  }
  const parseFnct = (): Node => {
    if (Object.keys(fncts).some(f => tokens[col] === f)) {
      return { type: "expr", value: tokens[col++], expr: [] };
    }
    else { throw new Error(`function "${tokens[col]}" was not found`); }
  }
  const parseExpr = (): Node => {
    if (/\d/.test(tokens[col])) { return parseNum(); }
    else if (/\(/.test(tokens[col++])) {
      if (/\d/.test(tokens[col])) { return parseNum(); }
      if (/\)/.test(tokens[col])) { throw new Error(`bad syntax`); }

      const node: Node = parseFnct();

      if (/\)/.test(tokens[col])) { throw new Error(`function "${tokens[col - 1]}" is missing arguments`); }
      while (tokens[col] !== ")") {
        node.expr.push(parseExpr());
      }
      col++;

      return node;
    }
    else { throw new Error(`bad syntax`); }
  }

  return parseExpr();
}

export default function compile(line: string): string {
  const parsedTree = parse(tokenize(line));

  const compileNum = (node: Node): string => {
    return node.value >= 0 ? String(node.value) : `(${String(node.value)})`;
  }
  const compileFnct = (node: Node): string => {
    return `(${node.expr.map(compileExpr).join(fncts[node.value])})`;
  }
  const compileExpr = (node: Node): string => {
    return node.type === "num" ? compileNum(node) : compileFnct(node);
  }

  return compileExpr(parsedTree);
}