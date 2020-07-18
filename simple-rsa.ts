export { RSA, RSAMath }

abstract class RSAMath {
  static generateEncryptionKey(phi: bigint): bigint {
    let e = BigInt(Math.floor(3 + Math.random() * (2 ** 12)))
    for (; this.extendedEuclidianAlgorithm(e, phi)[2] !== 1n; e = BigInt(Math.floor(3 + Math.random() * (2 ** 12))));
    return BigInt(e)
  }

  static generatePrime(bitSize: number = 42, bitRange: number = 4): bigint {
    let min = 2 ** (bitSize - bitRange), max = 2 ** (bitSize + bitRange), p = BigInt(Math.floor(min + Math.random() * (max - min)))
    for (; !this.simplePrimalityTest(p); p = BigInt(Math.floor(min + Math.random() * (max - min))));
    return BigInt(p)
  }

  static simplePrimalityTest(n: bigint): boolean {
    let i = 2n
    for (; i * i <= n; i++) {
      if (n % i == 0n) return false
    }
    return true
  }

  static modularExponentiation(a: bigint, b: bigint, m: bigint): bigint {    // a^b mod m
    let result = 1n
    if (a === 0n) return 0n
    while (b > 0) {
      if (b & 1n) result = (result * a) % m
      b = b >> 1n;
      a = (a * a) % m;
    }
    return result;
  }

  static modularInverse(e: bigint, m: bigint): bigint {    // ed = 1 (mod m) with gcd(e, m) = 1
    let xgcd = this.extendedEuclidianAlgorithm(e, m)
    if (xgcd[2] !== 1n) return -1n
    return (xgcd[0] + m) % m    // ey + mx = 1 (Bezout's identity for gcd(e, m) = 1) with xgdc[0] = y
  }

  static extendedEuclidianAlgorithm(a: bigint, b: bigint): [bigint, bigint, bigint] {     // ay + bx = gcd(a, b) -> [y, x, gcd(a, b)]
    if (b == 0n) { return [1n, 0n, a] }
    let xgcd = this.extendedEuclidianAlgorithm(b, a % b)
    return [xgcd[1], xgcd[0] - xgcd[1] * (a / b), xgcd[2]]
  }
}

class RSA {
  private inbox: Array<bigint>
  private d: bigint
  public e: bigint
  public n: bigint

  constructor(e: bigint = 1n, p1: bigint = 0n, p2: bigint = 0n) {
    if (p1 * p2 === 0n) {
      while (p1 === p2) p1 = RSAMath.generatePrime(), p2 = RSAMath.generatePrime()
    }
    let phi = (p1 - 1n) * (p2 - 1n)
    if (e === 1n || RSAMath.extendedEuclidianAlgorithm(e, phi)[2] !== 1n) e = RSAMath.generateEncryptionKey(phi)
    this.inbox = []
    this.d = RSAMath.modularInverse(e, phi)   // ed = 1 (mod phi(n))
    this.e = e
    this.n = p1 * p2
  }

  private encrypt(message: bigint): bigint {
    return RSAMath.modularExponentiation(message, this.e, this.n)    // m^e = c (mod n) for m = message
  }

  private decrypt(message: bigint): bigint {
    return RSAMath.modularExponentiation(message, this.d, this.n)    // c^d = m (mod n) for c = message
  }

  public addToInbox(message: bigint): void {
    this.inbox.push(this.encrypt(message))
  }

  public viewInbox(): Array<bigint> {
    return this.inbox
  }

  public decryptInbox(): Array<bigint> {
    let messages = []
    for (; this.inbox.length > 0; messages.push(this.decrypt(this.inbox.shift())));
    return messages
  }
}