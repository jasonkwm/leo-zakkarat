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
    for (let i = this.sequence.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.sequence[i], this.sequence[j]] = [
        this.sequence[j],
        this.sequence[i],
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

  /* Deal a card from the top of the deck */
  deal() {
    const card = this.sequence.shift();
    return card;
  }
}

/*** Check whether the deck is propally initialized ***/
const myDeck = new Deck();
console.log(myDeck.deckSequnce);
