var SHA256 = require('crypto-js/sha256');
var Block = /** @class */ (function () {
    function Block(id, transactions, proofOfWork, previousHash) {
        this.id = id;
        this.transactions = transactions;
        this.hash = this.computeHash();
        this.proofOfWork = proofOfWork;
        (previousHash ? (this.previousHash = previousHash) : (this.previousHash = ""));
    }
    Block.prototype.computeHash = function () {
        return SHA256(JSON.stringify(this)).toString();
    };
    Block.prototype.generateProofOfWork = function (difficulty) {
        var proofOfWork = 0;
        while (!this.verifyProofOfWork(difficulty)) {
            this.proofOfWork = Math.floor(Math.random() * (Math.pow(2, 48) - 1));
            this.hash = this.computeHash();
        }
        return proofOfWork;
    };
    Block.prototype.verifyProofOfWork = function (difficulty) {
        return (this.hash.substring(0, difficulty) === Array(difficulty + 1).join("0"));
    };
    return Block;
}());
var Blockchain = /** @class */ (function () {
    function Blockchain(difficulty) {
        this.blockchain = [];
        this.difficulty = difficulty;
        this.createNewBlock([{ sender: "", recipient: "", amount: 0, date: Date.now() }], 0).generateProofOfWork(this.difficulty);
    }
    Blockchain.prototype.getLastBlock = function () {
        return (this.blockchain.length ? this.blockchain[this.blockchain.length - 1] : null);
    };
    Blockchain.prototype.createNewBlock = function (transactions, proofOfWork) {
        var block = new Block(this.blockchain.length, transactions, proofOfWork);
        (this.getLastBlock() ? block.previousHash = this.getLastBlock().hash : block.previousHash = "");
        this.blockchain.push(block);
        return block;
    };
    return Blockchain;
}());
var cryptoChain = new Blockchain(3);
cryptoChain.createNewBlock([{ sender: "andrei", recipient: "world", amount: 10, date: Date.now() }], 0).generateProofOfWork(3);
cryptoChain.createNewBlock([{ sender: "world", recipient: "world", amount: 100, date: Date.now() }], 0).generateProofOfWork(3);
cryptoChain.createNewBlock([{ sender: "world", recipient: "andrei", amount: 10, date: Date.now() }], 0).generateProofOfWork(3);
var block = cryptoChain.createNewBlock([{ sender: "world", recipient: "andrei", amount: 10, date: Date.now() }], 0);
console.log(block.verifyProofOfWork(3));
block.generateProofOfWork(3);
console.log(JSON.stringify(cryptoChain, null, 4));
console.log(block.verifyProofOfWork(3));
