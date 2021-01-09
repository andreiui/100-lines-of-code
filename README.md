# 100 Lines of Code

> Simplicity is prerequisite for reliability––Edsger W. Dijkstra

A collection of short pedagogic programs introducing data structures and computational math puzzles. Implement hash tables, RSA encryption, compiler functions and blockchain technology.

## Getting Started

To run the programs, you will need to have installed Node.js and npm (Node.js package manager) on your local machine.

Programs are written in TypeScript. For the latest version, run:

    npm install -g typescript

To run any simple-program, first compile into JavaScript using

    tsc [simple-*].ts

And then run:

    node [simple-*].js

---

### simple-blockchain

A simple blockchain in 90 lines.

To use library, import `simple-blockchain` and create a new `Blockchain` object with a difficulty integer as its constructor argument.

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

---

### simple-hashtable

A simple hashtable in 83 lines.

To use library, import `simple-hashtable` and create a new `Hashtable` object.

Class methods `insert`, `search`, and `delete` allow for insertion, searching, and deletion of elements of type `Pair` inside
hash table.

_References: ["Notes on Data Structures and Programming Techniques, 5.4 Hash tables" (CPSC 223, Spring 2020)––James Aspnes](https://www.cs.yale.edu/homes/aspnes/classes/223/notes.html#hashTables)_

---

### simple-rsa

A simple RSA encryption program in 87 lines.

To use library, import `simple-rsa` and create a new `RSA` object. When creating a new `RSA(e: bigint?, p1: bigint?, p2: bigint?)`, it will generate a new public encryption key and new private prime factors, if none are provided in its constructor.

The RSA implementation is comprised of the following: a public modulo `n`, a public encryption key `e`, a private decryption key `d`, and an inbox containing any encripted messages.

- To add a message to the inbox to be encrypted, call the class method `addToInbox` that takes one argument: a message of type `BigInt`
- To view the inbox and its encrypted content, call the class method `viewInbox`
- To decrypt the entire inbox, call the class method `decryptInbox` (the method will also empty the inbox)

Note: This specific implementation of the RSA algorithm uses `BigInt` (see [Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)). This is done in an attempt to avoid adding unnecesarry complexity to the contents of the program and allow for the generating larger prime numbers with ease. However, for real cryptographic applications, it is recommended to avoid using `BigInt` due to operations not being constant-time (see `BigInt` documentation under "Usage recommendations > Cryptography" and ["A beginner's guide to constant-time cryptography"](https://www.chosenplaintext.ca/articles/beginners-guide-constant-time-cryptography.html))

The library also includes an abstract class `RSAMath`, which provides the mathematical functions necessary for the implementation of the RSA algorithm.

- The static method `generateEncryptionKey` takes an argument: `phi`, and generates a small encryption key that does not share any prime factors with `phi`
- The static method `generatePrime` takes two optional arguments: `bitSize` and `bitRange`, and generates a random prime number of `bitSize ± bitRange` bits. By default `bitSize = 42` and `bitRange = 4`
- The static method `simplePrimalityTest` takes an argument: `n`, and returns whether `n` is prime or not
- The static method `modularExponentiation` takes three arguments: `a`, `b`, and `m`, and returns the result of the calculation `a^b mod m`
- The static method `modularInverse` takes two arguments: `e` and `m`, and returns the inverse of `e`, i.e. `d` such that `ed = de = 1 (mod m)`, or `-1n` if such a number does not exist
- The static method `extendedEuclidianAlgorithm` takes two arguments: `a` and `b`, and returns the solution to the equation `ay + bx = gcd(a, b)` in an array of three elements: `[y, x, gcd(a, b)]`

_References: ["Notes on Discrete Mathematics, 8.7. RSA encryption (CPSC 202, Spring 2020)––James Aspnes"](https://www.cs.yale.edu/homes/aspnes/classes/202/notes.pdf)_

_Additional resources: ["Modular multiplicative inverse"](https://en.wikipedia.org/wiki/Modular_multiplicative_inverse), ["Bézout's identity and extended GCD algorithm"](https://en.wikipedia.org/wiki/Polynomial_greatest_common_divisor#B.C3.A9zout.27s_identity_and_extended_GCD_algorithm), ["Euler's theorem"](https://en.wikipedia.org/wiki/Euler%27s_theorem)_
