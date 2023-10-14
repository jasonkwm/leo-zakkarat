const { createHash, randomBytes } = require("crypto");

/***
 * Creation of the Deck Class and return in to frontend
 * ***/

class Deck {
  /*** Constructor Function***/
  constructor() {
    this.deckSequence = [];
    this.initDeck();
  }

  /*** Initialize a new deck ***/
  initDeck() {
    let suits = ["♠️", "❤️", "♣️", "♦️"];
    let ranks = [
      "A",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "T",
      "J",
      "Q",
      "K",
    ];
    for (let suit of suits) {
      for (let rank of ranks) {
        this.deckSequence.push(suit + rank);
      }
    }
  }

  /*** Shuffle deck using Fisher-Yates Algorithm ***/
  /* Math.ramdom() is pseudoramdom */
  /* Depends of browser, it will use different seed to generate the randomness */
  shuffle() {
    for (let i = this.deckSequence.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.deckSequence[i], this.deckSequence[j]] = [
        this.deckSequence[j],
        this.deckSequence[i],
      ];
    }
  }

  /*** Hash the current sequence with salt and return the hash ***/
  hashState() {
    let sequence = "";
    for (let card of this.deckSequence) {
      sequence += card;
    }
    let salt = randomBytes(32).toString("hex");
    this.verifySequence = sequence;
    this.verifySalt = salt;

    return createHash("md5")
      .update(salt + sequence)
      .digest("hex");
  }

  /*** Given salt and sequence, verify the hahs ***/
  verifyHash(salt, sequence, hash) {
    return (
      createHash("sha256")
        .update(salt + sequence)
        .digest("hex") == hash
    );
  }

  returnStoredSequence() {
    return this.verifySequence;
  }

  returnStoredSalt() {
    return this.verifySalt;
  }

  /* Deal a card from the top of the deck */
  deal() {
    const card = this.deckSequence.shift();
    return card;
  }
}

module.exports = Deck;

/*** Check whether the deck is propally initialized ***/
const myDeck = new Deck();
myDeck.shuffle();
// Check Sequence
console.log(myDeck.deckSequence);
// Hash the current state
hash = myDeck.hashState();
// Print the state hahs
console.log("Sequence State Hash :", hash);
// Return stored sequence for verification after game
sequence = myDeck.returnStoredSequence();
console.log("Sequence: ", sequence);
// Return stored salt for verification after game
salt = myDeck.returnStoredSalt();
// Verify the genuinity of the game
console.log("Salt: ", salt);
console.log(myDeck.verifyHash(salt, sequence, hash));
// Convert hex hash to decimals
const decimalHash = BigInt(`0x${hash}`).toString(10);
console.log(decimalHash);
