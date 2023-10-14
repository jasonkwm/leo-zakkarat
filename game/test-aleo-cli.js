const Deck = require("./deck-class");

const gameDeck = new Deck();

gameDeck.shuffle();

const sixCards = [];

for (let i = 0; i < 6; i++) {
  sixCards.push(gameDeck.deal());
}

console.log(sixCards);

const cardValues = {
  A: 1,
  T: 10,
  J: 10,
  Q: 10,
  K: 10,
};

const cardPoints = sixCards.map((card) => {
  const cardFace = card.slice(2);
  return cardValues[cardFace] || parseInt(cardFace, 10);
});

console.log(cardPoints);
