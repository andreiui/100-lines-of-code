export { Hashtable, Pair, _DEFAULT_INIT_SIZE, _DEFAULT_LOAD_FACTOR };

const _DEFAULT_INIT_SIZE = 64;
const _DEFAULT_LOAD_FACTOR = 8;
const _PRIME_MULTIPLIER = 314159;

interface Pair {
  key: string;
  value: any;
}

class Hashtable {
  private size: number;
  private count: number;
  private bucket: Array<Array<Pair>>;

  constructor(size: number = _DEFAULT_INIT_SIZE) {
    this.size = size;
    this.count = 0;
    this.bucket = [];
  }

  insert(key: string, value: any): void {
    let index = this.simpleHash(key);

    if (this.bucket[index] === undefined)
      this.bucket[index] = [];
    this.bucket[index].push({ key: key, value: value });
    this.count++;

    if (this.count >= this.size * _DEFAULT_LOAD_FACTOR)
      this.grow();
  }

  search(key: string): Pair {
    let index = this.simpleHash(key);

    if (this.bucket[index] !== undefined) {
      for (const pair of this.bucket[index]) {
        if (pair.key === key)
          return pair;
      }
    }
    return null;
  }

  delete(key: string): void {
    let index = this.simpleHash(key);
    this.bucket[index] = this.bucket[index].filter(pair => pair.key !== key);
  }

  private simpleHash(key: string): number {
    let sum = 0;
    let shift = 0;

    [...key].forEach(ch => {
      sum ^= ch.charCodeAt(0) << shift;
      shift = (shift % 57) + 4;
    });
    sum += sum >> 33;
    sum *= _PRIME_MULTIPLIER;
    sum += sum >> 33;

    return ((sum % this.size) + this.size) % this.size;
  }

  private grow(): void {
    let auxTable = new Hashtable(this.size * _DEFAULT_LOAD_FACTOR);
    console.log(this);

    for (let index = 0; index < this.size; index++) {
      if (this.bucket[index] !== undefined) {
        for (const pair of this.bucket[index]) {
          auxTable.insert(pair.key, pair.value);
        }
      }
    }

    this.size = auxTable.size;
    this.count = auxTable.count;
    this.bucket = auxTable.bucket;
  }
}