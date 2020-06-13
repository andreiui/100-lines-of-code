const SHA256 = require('crypto-js/sha256');

interface Transaction {
  sender: string,
  recipient: string,
  amount: number,
  date: number
}

class Block {
  id: number;
  transactions: Array<Transaction>;
  hash: string;
  previousHash: string;
  proofOfWork: number;

  constructor(id: number, transactions: Array<Transaction>, proofOfWork?: number) {
    this.id = id;
    this.transactions = transactions;
    this.hash = this.computeHash();
    this.previousHash = "";
    (proofOfWork ? this.proofOfWork = proofOfWork : this.proofOfWork = 0);
  }

  computeHash(): string {
    return SHA256(JSON.stringify(this)).toString();
  }

  generateProofOfWork(difficulty: number): number {
    let proofOfWork = 0;
    while (!this.verifyProofOfWork(difficulty)) {
      this.proofOfWork = Math.floor(Math.random() * (2 ** 48 - 1));
      this.hash = this.computeHash();
    }
    return proofOfWork;
  }

  verifyProofOfWork(difficulty: number): Boolean {
    return (this.hash.substring(0, difficulty) === Array(difficulty + 1).join("0"));
  }
}

class Blockchain {
  blockchain: Array<Block>;
  difficulty: number;

  constructor(difficulty: number) {
    this.blockchain = [];
    this.difficulty = difficulty;
    this.createNewBlock([{ sender: "", recipient: "", amount: 0, date: Date.now() }]).generateProofOfWork(this.difficulty);
  }

  getLastBlock(): Block {
    return (this.blockchain.length ? this.blockchain[this.blockchain.length - 1] : null);
  }

  createNewBlock(transactions: Array<Transaction>, proofOfWork?: number): Block {
    let block = new Block(this.blockchain.length, transactions, proofOfWork);
    (this.getLastBlock() ? block.previousHash = this.getLastBlock().hash : block.previousHash = "");
    this.blockchain.push(block);
    return block;
  }
}

let cryptoChain = new Blockchain(3);
cryptoChain.createNewBlock([{ sender: "andrei", recipient: "world", amount: 10, date: Date.now() }], 0).generateProofOfWork(3);
cryptoChain.createNewBlock([{ sender: "world", recipient: "world", amount: 100, date: Date.now() }], 0).generateProofOfWork(3);
cryptoChain.createNewBlock([{ sender: "world", recipient: "andrei", amount: 10, date: Date.now() }], 0).generateProofOfWork(3);
let block = cryptoChain.createNewBlock([{ sender: "world", recipient: "andrei", amount: 10, date: Date.now() }], 0);
console.log(block.verifyProofOfWork(3));
block.generateProofOfWork(3);
console.log(JSON.stringify(cryptoChain, null, 4));
console.log(block.verifyProofOfWork(3));
