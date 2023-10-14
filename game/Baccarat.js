const readline = require("readline");
const Deck = require("./deck-class");

/********************/
/* Helper Functions */
/********************/

/***  Sleep function ***/
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/*** Interface to read terminal input ***/
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function getUserStartGameInput(gameDeck, hash) {
  return new Promise((resolve) => {
    rl.question(
      `\nThe game hash is ${hash}. Do you wanna start the game?\n`,
      async (answer) => {
        answer = answer.toLowerCase();
        if (answer !== "yes" && answer !== "no") {
          console.log("\nInvalid input. Please select either yes or no.\n");
          return resolve(await getUserStartGameInput(gameDeck, hash));
        } else if (answer === "no") {
          console.log(`\nReshuffling deck...\n`);
          gameDeck.shuffle();
          hash = gameDeck.hashState();
          await sleep(1000);
          return resolve(await getUserStartGameInput(gameDeck, hash));
        }
        resolve([true, hash]);
      }
    );
  });
}

/********************/
/* Game Functions */
/********************/

/***  Print the hand ***/
function printHand(hand) {
  for (let card of hand) {
    console.log(card);
  }
  console.log(`Points: ${calculateHand(hand)}`);
  if (isNatural(hand)) {
    console.log("Natural Hand !!!!");
  }
}

/*** Compare points and determine winner ***/
function calculateHand(hand) {
  let points = 0;
  for (let card of hand) {
    /* Slice 2 because emoji uses 2 characters */
    let value = card.slice(2);

    /* If value parses into NaN, it will be either A, J, Q or K */
    if (!isNaN(parseInt(value))) {
      points += parseInt(value);
    } else {
      switch (value) {
        case "A":
          points += 1;
          break;
        case "T":
        case "J":
        case "Q":
        case "K":
          points += 0;
          break;
      }
    }
  }
  return points % 10;
}

/*** Calculate a hand whether is natural or not ***/
function isNatural(hand) {
  if (hand.length == 2) return calculateHand(hand) >= 8 ? true : false;
  return false;
}

/*** Determine player's and banker's move ***/
async function thirdCardLogic(deck, playersHand, bankersHand) {
  /* If natural hand, directly calculate winner */
  if (isNatural(playersHand) || isNatural(bankersHand)) {
    await sleep(1000);
    return [playersHand, bankersHand];
  }

  /* Player's movement */
  console.log(`\n<*** Card 3 ***>`);
  await sleep(1000);
  if (calculateHand(playersHand) <= 5) {
    console.log(`\nDealing 3rd card for Banker...\n`);
    playersHand.push(deck.deal());
  } else {
    console.log(`\nPlayer doesn't need 3rd card...)\n`);
  }
  console.log(`\nPlayers Final hand: `);
  printHand(playersHand);

  /* Banker's movement */
  /* Banker move determined by whether player was dealed extra card */
  await sleep(1000);
  if (playersHand.length <= 2) {
    /* If player has 2 cards */
    console.log(`\nPlayers hand: `);
    printHand(playersHand);

    if (calculateHand(bankersHand) <= 5) {
      console.log(`\nDealing 3rd card for Banker...\n`);
      bankersHand.push(deck.deal());
    } else {
      console.log(`\nBanker doesn't need 3rd card... \n`);
    }
  } else {
    /* If player has 3 cards */

    /* Determine player's third card value */
    let playersThirdCard;
    let card = playersHand[2].slice(2);
    if (card == "A") {
      playersThirdCard = 1;
    } else if (["T", "J", "Q", "K"].includes(card)) {
      playersThirdCard = 0;
    } else {
      playersThirdCard = parseInt(card);
    }
    if (calculateHand(bankersHand) <= 2) {
      /* If banker's hand is 2, deal extra card no matter what */
      console.log(`\nDealing 3rd card for Banker...\n`);
      bankersHand.push(deck.deal());
    } else if (calculateHand(bankersHand) == 3) {
      /* If banker's hand is 3, deal extra card other than the case where player's third card is 8*/
      if (playersThirdCard != 8) {
        console.log(`\nDealing 3rd card for Banker...\n`);
        bankersHand.push(deck.deal());
      }
    } else if (calculateHand(bankersHand) == 4) {
      /* If banker's hand is 4, deal extra card if player's third card is not [0, 1, 8, 9] */
      let cardsToSkip = [0, 1, 8, 9];
      if (!cardsToSkip.includes(playersThirdCard)) {
        console.log(`\nDealing 3rd card for Banker...\n`);
        bankersHand.push(deck.deal());
      } else {
        console.log(`\nBanker doesn't need 3rd card... \n`);
      }
    } else if (calculateHand(bankersHand) == 5) {
      /* If banker's hand is 5, deal extra card if player's third card is not [0, 1, 2, 3, 8, 9] */
      let playersThirdCard = parseInt(playersHand[2].slice(2));
      let cardsToSkip = [0, 1, 2, 3, 8, 9];
      if (!cardsToSkip.includes(playersThirdCard)) {
        console.log(`\nDealing 3rd card for Banker...\n`);
        bankersHand.push(deck.deal());
      } else {
        console.log(`\nBanker doesn't need 3rd card... \n`);
      }
    } else if (calculateHand(bankersHand) == 6) {
      /* If banker's hand is 6, deal extra card only if player's third card is [6, 7] */
      let playersThirdCard = parseInt(playersHand[2].slice(2));
      let cardsToSkip = [0, 1, 2, 3, 4, 5, 8, 9];
      if (!cardsToSkip.includes(playersThirdCard)) {
        console.log(`\nDealing 3rd card for Banker...\n`);
        bankersHand.push(deck.deal());
      } else {
        console.log(`\nBanker doesn't need 3rd card... \n`);
      }
    } else if (calculateHand(bankersHand) >= 7) {
      console.log(`\nBanker doesn't need 3rd card... \n`);
    }
    console.log(`\nBankers final hand: `);
    printHand(bankersHand);
    await sleep(1000);
    return [playersHand, bankersHand];
  }

  /* Return value based on winner */
}

async function dealCards(gameDeck) {
  console.log(`\nDealing!!\n`);
  let playersHand = [];
  let bankersHand = [];

  /* Dealing first 2 cards of each */
  for (let i = 0; i < 2; i++) {
    console.log(`\n<*** Dealing Card ${i + 1} ***>\n`);
    playersHand.push(gameDeck.deal());
    console.log(`\nPlayers hand: `);
    printHand(playersHand, "\n");
    await sleep(1000);
    bankersHand.push(gameDeck.deal());
    console.log(`\nBankers hand: `);
    printHand(bankersHand, "\n");
    await sleep(1000);
  }

  /* Baccarat rules decides moves */
  [playersHand, bankersHand] = await thirdCardLogic(
    gameDeck,
    playersHand,
    bankersHand
  );

  return [playersHand, bankersHand];
}

/********************/
/* Game Functions */
/********************/

async function baccarat() {
  console.log("\n<*** Initializing New Baccarat Game ***>\n");

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

  /*

  */

  // Commencing the game when user agree with the hash
  console.log(`<*** Starting Game ***>`);

  // Deal the cards to users based on Baccarat rules
  let playersHand;
  let bankersHand;
  [playersHand, bankersHand] = await dealCards(gameDeck);

  // Checking who won the game

  rl.close();
}

module.exports = baccarat;

async function main() {
  baccarat();
}

main();
