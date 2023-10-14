const readline = require("readline");
const Deck = require("./deck-class");
const {
  rl,
  sleep,
  getUserStartGameInput,
  getBettingChoice,
  getBettingAmount,
  printHand,
  calculateHand,
  isNatural,
  thirdCardLogic,
  dealCards,
  calculateWinner,
  showBettingResult,
} = require("./game-functions");

/*** This was meant to be the test logic of the game in the CLI form  ***/
/*** If implemented using REACT or other frontend frameworks, just import the game functions under ./game-functions.js ***/

/********************/
/* Helper Functions */
/********************/

/********************/
/* Game Functions */
/********************/

async function baccarat() {
  console.log("\n<*** Initializing New Baccarat Game ***>\n");

  const usersCredit = 100_000;
  console.log(`\nUser's credit: ${usersCredit}\n`);

  // Initializing Deck Object
  console.log("\n<*** Preparing Deck ***>\n");
  const gameDeck = new Deck();

  // Shuffle the deck
  console.log("\n<*** Shuffling Deck ***>\n");
  gameDeck.shuffle();

  // Hash the state of the Deck
  let hash = gameDeck.hashState();

  // Allow user to select a hash that they prefer
  let startGame = false;
  while (!startGame) {
    [startGame, hash] = await getUserStartGameInput(gameDeck, hash);
  }

  // User's choice
  const usersChoice = await getBettingChoice();
  // Get user's betting amount
  const usersBettingAmount = await getBettingAmount(usersCredit);

  // Commencing the game when user agree with the hash and bet
  console.log(`<*** Starting Game ***>`);

  // Deal the cards to users based on Baccarat rules
  let playersHand;
  let bankersHand;
  [playersHand, bankersHand] = await dealCards(gameDeck);

  // Checking who won the game
  let result = calculateWinner(playersHand, bankersHand);
  if (result == "player") {
    console.log(`\n<*** Player Won!! ***>\n`);
  } else if (result == "banker") {
    console.log(`\n<*** Banker Won!! ***>\n`);
  } else {
    console.log(`\n<*** It's a Tie!!***>\n`);
  }

  await showBettingResult(result, usersChoice, usersCredit, usersBettingAmount);

  console.log(`\nGame Salt: ${gameDeck.storedSalt}\n`);
  console.log(`\nStored Sequence: ${gameDeck.storedProofSequence}\n`);
  console.log(
    gameDeck.verifyHash(gameDeck.storedSalt, gameDeck.storedProofSequence, hash)
  );

  rl.close();
}

module.exports = baccarat;

async function main() {
  baccarat();
}

main();
