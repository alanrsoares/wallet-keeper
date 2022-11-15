import { Wallet as _Wallet } from "@ethersproject/wallet";

/**
 * Wallet class
 */
export class Wallet {
  #wallet?: _Wallet;
  generate() {
    this.#wallet = _Wallet.createRandom();
    return this.#wallet;
  }
}
