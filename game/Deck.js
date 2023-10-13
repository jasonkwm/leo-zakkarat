const { createHash, randomBytes } = require("crypto");

class Deck {
  /*** Constructor Function***/
  constructor() {
    this.deckSequnce = [];
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
      "10",
      "J",
      "Q",
      "K",
    ];
    for (let suit of suits) {
      for (let rank of ranks) {
        this.deckSequnce.push(suit + rank);
      }
    }
  }

  /*** Shuffle deck using Fisher-Yates Algorithm ***/
  /* Math.ramdom() is pseudoramdom */
  /* Depends of browser, it will use different seed to generate the randomness */
  shuffle() {
    for (let i = this.deckSequnce.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.deckSequnce[i], this.deckSequnce[j]] = [
        this.deckSequnce[j],
        this.deckSequnce[i],
      ];
    }
  }

  /*** Hash the current sequence with salt and return the hash ***/
  hashState() {
    let sequence = "";
    for (let card of this.deckSequnce) {
      sequence += card;
    }
    let salt = randomBytes(32).toString("hex");
    this.verifySequence = sequence;
    this.verifySalt = salt;

    return createHash("sha256")
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
    const card = this.sequence.shift();
    return card;
  }
}

/*** Check whether the deck is propally initialized ***/
const myDeck = new Deck();
myDeck.shuffle();
console.log(myDeck.deckSequnce);
hash = myDeck.hashState();
console.log("Sequence State Hash :", hash);
sequence = myDeck.returnStoredSequence();
console.log("Sequence: ", sequence);
salt = myDeck.returnStoredSalt();
console.log("Salt: ", salt);
console.log(myDeck.verifyHash(salt, sequence, hash));
