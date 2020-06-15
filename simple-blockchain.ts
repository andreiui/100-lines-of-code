const SHA256 = require('crypto-js/sha256');

interface Transaction {
  sender: string;
  recipient: string;
  amount: number;
  date: number;
}

class Block {
  index: number;
  transactions: Array<Transaction>;
  hash: string;
  timestamp: number;
  previousHash: string;
  proofOfWork: number;

  constructor(index: number, transactions: Array<Transaction>, proofOfWork: number) {
    this.index = index;
    this.transactions = transactions;
    this.hash = this.computeHash();
    this.timestamp = Date.now();
    this.previousHash = "";
    this.proofOfWork = proofOfWork;
  }

  computeHash(): string {
    return SHA256(this.index + JSON.stringify(this.transactions) + this.timestamp + this.previousHash + this.proofOfWork).toString();
  }
}

class Blockchain {
  blockchain: Array<Block>;
  difficulty: number;

  constructor(difficulty: number) {
    this.blockchain = [];
    this.difficulty = difficulty;
    this.createNewBlock([{ sender: "genesis", recipient: "", amount: 0, date: Date.now() }]);
    this.mine("");
  }

  getLastBlock(): Block {
    return (this.blockchain.length ? this.blockchain[this.blockchain.length - 1] : null);
  }

  addTransaction(transaction: Transaction, block: Block = this.getLastBlock()): void {
    block.transactions.push(transaction);
  }

  createNewBlock(transactions: Array<Transaction>, proofOfWork: number = 0): Block {
    let block = new Block(this.blockchain.length, transactions, proofOfWork);
    (this.getLastBlock() ? block.previousHash = this.getLastBlock().hash : block.previousHash = "");
    this.blockchain.push(block);
    return block;
  }

  generateProofOfWork(block: Block = this.getLastBlock()): number {
    let proofOfWork = block.proofOfWork;
    while (!this.verifyProofOfWork(block)) {
      block.proofOfWork = Math.floor(Math.random() * (2 ** 64 - 1));
      block.hash = block.computeHash();
    }
    return proofOfWork;
  }

  verifyProofOfWork(block: Block = this.getLastBlock()): Boolean {
    return (block.computeHash().substring(0, this.difficulty) === Array(this.difficulty + 1).join("0"));
  }

  verifyBlockchain(): Boolean {
    for (let i = 1; i < this.blockchain.length; i++) {
      let currentBlock = this.blockchain[i];
      let previousBlock = this.blockchain[i - 1];
      if (currentBlock.previousHash !== previousBlock.hash || !this.verifyProofOfWork(currentBlock))
        return false;
    }
    return true;
  }

  mine(user: string, block: Block = this.getLastBlock()): void {
    let prize: Transaction = { sender: "blockchain", recipient: user, amount: 1, date: Date.now() };
    this.addTransaction(prize, block);
    console.log(`mining in progress for block (index:${block.index})`);
    this.generateProofOfWork(block);
    console.log(`new block (hash:${block.hash}) was mined`);
  }
}