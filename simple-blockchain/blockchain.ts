const SHA256 = require('crypto-js/sha256');

interface Transaction {
  sender: string,
  recipient: string,
  amount: number,
  signature: number,
  date: number
}

class Block {
  id: number;
  transactions: Array<Transaction>;
  hash: string;
  proofOfWork: number;
  previousHash: string;

  constructor(id: number, transactions: Array<Transaction>, proofOfWork: number, previousHash?: string) {
    this.id = id;
    this.transactions = transactions;
    this.hash = this.computeHash();
    this.proofOfWork = proofOfWork;
    (previousHash ? (this.previousHash = previousHash) : (this.previousHash = ""));
  }

  computeHash() {
    return SHA256(JSON.stringify(this)).toString();
  }

  generateProofOfWork(difficulty: number) {
    let proofOfWork = 0;
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
      this.proofOfWork = Math.floor(Math.random() * (2 ** 63 - 1));
      this.hash = this.computeHash();
    }
    return proofOfWork;
  }
}

class Blockchain {
  blockchain: Array<Block>;
  difficulty: number;

  constructor(difficulty: number) {
    this.blockchain = [];
    this.difficulty = difficulty;
    this.createNewBlock([{ sender: "", recipient: "", amount: 0, signature: 0, date: Date.now() }], 0).generateProofOfWork(this.difficulty);
  }

  getLastBlock() {
    return this.blockchain[this.blockchain.length - 1];
  }

  createNewBlock(transactions: Array<Transaction>, proofOfWork: number) {
    let block = new Block(
      this.blockchain.length,
      transactions,
      proofOfWork
    );
    block.previousHash = this.getLastBlock().hash;
    this.blockchain.push(block);
    return block;
  }

  verifyValidProofOfWork() {
  }

  verifyBlockchain() {
    for (let i = 1; i < this.blockchain.length; i++) {
      const currentBlock = this.blockchain[i];
      const previousBlock = this.blockchain[i - 1];
    }
  }
}

let cryptoChain = new Blockchain(3);
let block = cryptoChain.createNewBlock([{ sender: "andrei", recipient: "world", amount: 10, signature: 1010102, date: Date.now() }], 0);
block.generateProofOfWork(cryptoChain.difficulty);
console.log(JSON.stringify(cryptoChain));
