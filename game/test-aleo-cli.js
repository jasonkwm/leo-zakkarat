const Deck = require("./deck-class");

const gameDeck = new Deck();

gameDeck.shuffle();

const sixCards = [];

for (let i = 0; i < 6; i++) {
  sixCards.push(gameDeck.deal());
}

console.log(sixCards);
