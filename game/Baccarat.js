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

/*** User chose to start the game ***/
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

/*** Get user's betting choice ***/
async function getBettingChoice() {
  return new Promise((resolve) => {
    rl.question(
      "\nPlease choose to bet on 'Banker or 'Player' or 'Tie': ",
      (answer) => {
        answer = answer.toLowerCase();
        if (answer !== "banker" && answer !== "player" && answer !== "tie") {
          console.log(
            "Invalid input. Please select either 'Banker' or 'Player'."
          );
          return resolve(getBettingChoice());
        }
        resolve(answer);
      }
    );
  });
}

/*** Get user's betting amount ***/
async function getBettingAmount(userCredit) {
  let betting;
  return new Promise((resolve) => {
    rl.question("\nPlease choose your betting amount: ", (answer) => {
      betting = parseFloat(answer);
      if (isNaN(betting) || betting < 0) {
        console.log("Invalid betting amount. Please input a valid value.");
        return resolve(getBettingAmount(userCredit));
      } else if (betting > userCredit) {
        console.log("You are betting more than you have.");
        console.log(`You only have ${userCredit}. Please input a valid value.`);
        return resolve(getBettingAmount(userCredit));
      } else if (betting % 2 !== 0) {
        // Check if betting amount is not even
        console.log(
          "Invalid betting amount. The betting amount must be an even number."
        );
        return resolve(getBettingAmount(userCredit));
      } else {
        resolve(betting);
      }
    });
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
  if (isNatural(playersHand) || isNatural(bankersHand)) {
    await sleep(1000);
    return [playersHand, bankersHand];
  }

  console.log(`\n<*** Card 3 ***>`);
  await sleep(1000);

  // Player's Movement
  if (calculateHand(playersHand) <= 5) {
    console.log(`\nDealing 3rd card for Player...\n`);
    playersHand.push(deck.deal());
  } else {
    console.log(`\nPlayer doesn't need 3rd card...\n`);
  }
  console.log(`\nPlayers Final hand: `);
  printHand(playersHand);

  // Banker's Movement
  await sleep(1000);
  let bankersPoints = calculateHand(bankersHand);

  let playerThirdCardValue;
  if (playersHand.length === 3) {
    const thirdCard = playersHand[2].slice(2);
    playerThirdCardValue = isNaN(parseInt(thirdCard))
      ? thirdCard === "A"
        ? 1
        : 0
      : parseInt(thirdCard);
  }

  // The rules for drawing a third card for the banker, depending on banker's points and the player's third card
  const drawRules = {
    3: () => playerThirdCardValue !== 8,
    4: () => ![0, 1, 8, 9].includes(playerThirdCardValue),
    5: () => ![0, 1, 2, 3, 8, 9].includes(playerThirdCardValue),
    6: () => [6, 7].includes(playerThirdCardValue),
  };

  if (playersHand.length === 2) {
    if (bankersPoints <= 5) {
      console.log(`\nDealing 3rd card for Banker...\n`);
      bankersHand.push(deck.deal());
    } else {
      console.log(`\nBanker doesn't need 3rd card...\n`);
    }
  } else {
    if (bankersPoints <= 2) {
      console.log(`\nDealing 3rd card for Banker...\n`);
      bankersHand.push(deck.deal());
    } else {
      // Check the draw rules based on banker's current points
      const shouldDraw = drawRules[bankersPoints] && drawRules[bankersPoints]();
      if (shouldDraw) {
        console.log(`\nDealing 3rd card for Banker...\n`);
        bankersHand.push(deck.deal());
      } else {
        console.log(`\nBanker doesn't need 3rd card...\n`);
      }
    }
  }

  console.log(`\nBankers Final hand: `);
  printHand(bankersHand);
  await sleep(1000);

  return [playersHand, bankersHand];
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

  // User's choice
  const userChoice = await getBettingChoice();
  // Get user's betting amount
  const userBettingAmount = await getBettingAmount();

  // Commencing the game when user agree with the hash and bet
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
