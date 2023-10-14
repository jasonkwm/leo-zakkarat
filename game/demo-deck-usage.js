const Deck = require("./deck-class");

const gameDeck = new Deck();

/*** Demo Deck Instructions ***/

// Console.log original seqence
console.log("Original sequence: ", gameDeck.deckSequence);

// Shuffle the sequence of the deck
gameDeck.shuffle();
console.log("Shuffled sequence: ", gameDeck.deckSequence);

// Before hashState() is called, the stored proof and salt will be undefined
console.log(
  "StoredProofSequence before hashState(): ",
  gameDeck.storedProofSequence
);
console.log("StoredSalt before hashState(): ", gameDeck.storedSalt);

// Hash = the state of the first six cards of the current shuffle
const hash = gameDeck.hashState();
console.log("Hash of the sequence + salt: ", hash);
// storedProofSequence and storedSalt will be updated after hashState was called
console.log(
  "StoredProofSequence after hashState(): ",
  gameDeck.storedProofSequence
);
console.log("StoredSalt after hashState(): ", gameDeck.storedSalt);

// Ways to deal 6 cards in different formats:

console.log("Normal deal: ", gameDeck.dealSixCards());
console.log("Deal and parsed as int: ", gameDeck.dealSixCardsParseAsInt());
console.log("Deal and parsed as index: ", gameDeck.dealSixCardsByDeckIndex()); // Starts with 1 - 52
