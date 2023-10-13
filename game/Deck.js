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
}

/*** Check whether the deck is propally initialized ***/
// const myDeck = new Deck();
// console.log(myDeck.deckSequnce);
