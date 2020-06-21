# Simple Programs

> Simplicity is prerequisite for reliability––Edsger W. Dijkstra

A collection of short coding projects, inspired from fun programming challenges.

## Getting Started

To run the programs, you will need to have installed Node.js and npm (Node.js package manager) on your local machine.

Programs are written in TypeScript. For the latest version, run:

    npm install -g typescript

To run any simple-program, first compile into JavaScript using

    tsc [name_of_simple_program].ts

And then run:

    node [name_of_simple_program].js

---

### simple-blockchain

A simple blockchain in 90 lines.

To use library, import `simple-blockchain` and create a new `Blockchain` object with a difficulty integer as its
constructor argument.

- To add new blocks to the Blockchain, call the class method `createNewBlock` with an array of Transactions and an optional proof of work as its arguments
- To add transactions to an existing block, call the class method `addTransaction` with a Transaction and an optional Block; if no Block is passed, the method will add the transaction to the last block in the chain
- To mine an existing block, call the class method `mine`; if no Block is passed, the method will mine the last block in the chain
- To verify the proof of work of a Block, call the class method `verifyProofOfWork`; if no Block is passed, the method will verify the last block in the chain
- To verify the validity of the Blockchain, call the class method `verifyBlockchain`
- The consensus is that the longest chain of Blocks is the valid Blockchain

Requires crypto-js library (MIT License). To install dependency, run:

    npm install crypto-js

_References: ["But how does bitcoin actually work?"––3blue1brown](https://www.youtube.com/watch?v=bBC-nXj3Ng4)_

---

### simple-compiler

A simple compiler in 64 lines.

To use library, import function `compile` from `simple-compiler`.

Takes only one argument: a line of code, i.e. a `string`, written in __simple-math syntax__ (very short documentation
available below), and converts it to calculator-executable math.

Note: Although it does not convert the instructions into machine-readable code (1s and 0s) like a traditional compiler,
it accomplishes the same elementary task: taking a line written in a higher-level programming language and converting it
into lower-level code for a computing machine––in this case, a simple calculator.

__Very short simple-math Syntax Documentation__

- Each line in __simple-math__ is an expression
- Each expression is either a floating point or a function call with one or more expressions as its arguments
- A function call is done by enclosing in parenthesis the function name followed by its arguments
- There are 5 supported functions: "sum", "dot", "div", "exp", and "mod"

Regex shortcuts:
`num := -?[0-9]*.?[0-9]+`
`fnct := sum | dot | div | exp | mod`
`expr := num | ( fnct expr+ )`

Examples:

- "(sum 1 2 3)" => "(1+2+3)"
- "(dot 0.5 (div 7 1.4))" => "(0.5*(7/1.4))"
- "(exp 2 (mod (dot 3 -6) 4))" => "(2**((3*(-6))%4))"

_References:_

---

### simple-hashtable

A simple hashtable in 83 lines.

To use library, import `simple-hashtable` and create a new `Hashtable` object.

Class methods `insert`, `search`, and `delete` allow for insertion, searching, and deletion of elements of type `Pair` inside
hash table.

_References: ["Notes on Data Structures and Programming Techniques, 5.4 Hash tables" (CPSC 223, Spring 2018)––James Aspnes](https://www.cs.yale.edu/homes/aspnes/classes/223/notes.html#hashTables)_