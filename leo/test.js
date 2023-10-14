const deckClass = require("../game/deck-class.js");
const { promisify } = require("util");
const exec = promisify(require("child_process").exec);
const fs = require("fs");

const deck = new deckClass();
deck.shuffle();

console.log(deck.deckSequence);

const shuffledSixCards = deck.dealSixCardsParseAsInt();

const BANKER_PRIVATE_KEY =
  "APrivateKey1zkpBpPcEWWHi2V3t9XMUZcLCHXCQtc3PnkHXmLTzxVffk59";
const PLYAER_PRIVATE_KEY =
  "APrivateKey1zkp5UAEDDhz9DVb3FZG2hJBGQiQg9VYqPF2XYJqv5BiybKP";

const playerHands = [`${shuffledSixCards[0]}u16`, `${shuffledSixCards[2]}u16`];
const bankerHands = [`${shuffledSixCards[1]}u16`, `${shuffledSixCards[3]}u16`];
const last_twoHands = [
  `${shuffledSixCards[4]}u16`,
  `${shuffledSixCards[5]}u16`,
];

const playerBetAmount = 500;
const playerChoice = Math.ceil(Math.random() * 3);
const uuid = "123u128";

function getOutput(output) {
  const startIndex = output.indexOf("{");
  const endIndex = output.lastIndexOf("}");
  const wholeOutput = output.slice(startIndex, endIndex + 1);

  return wholeOutput.split(" • ");
}

async function fed_printer() {
  fs.writeFileSync("./.env", `PRIVATE_KEY=${BANKER_PRIVATE_KEY}`);
  const amount = "1000000u64";
  const output = await exec(`leo run fed_printer ${amount}`);
  return output.stdout;
}

async function player_mint() {
  fs.writeFileSync("./.env", `PRIVATE_KEY=${PLYAER_PRIVATE_KEY}`);
  const amount = "1000u64";
  const output = await exec(`leo run player_mint ${amount}`);
  return output.stdout;
}

async function initialize_decks() {
  fs.writeFileSync("./.env", `PRIVATE_KEY=${BANKER_PRIVATE_KEY}`);
  const constructedBankerHands = JSON.stringify({
    first: bankerHands[0],
    second: bankerHands[1],
  });
  const constructedPlayerHands = JSON.stringify({
    first: playerHands[0],
    second: playerHands[1],
  });
  const constructedLastTwoHands = JSON.stringify({
    first: last_twoHands[0],
    second: last_twoHands[1],
  });

  const output = await exec(
    `leo run initialize_decks "${constructedBankerHands}" "${constructedPlayerHands}" "${constructedLastTwoHands}" ${uuid}`
  );

  return output.stdout;
}

async function make_bet(player_chips) {
  fs.writeFileSync("./.env", `PRIVATE_KEY=${PLYAER_PRIVATE_KEY}`);
  const output = await exec(
    `leo run make_bet "${player_chips}" ${playerChoice}u8 ${playerBetAmount}u64 ${uuid}`
  );
  return output.stdout;
}

async function play_game(casino_decks, player_bet) {
  fs.writeFileSync("./.env", `PRIVATE_KEY=${BANKER_PRIVATE_KEY}`);

  const output = await exec(
    `leo run play_game "${casino_decks}" "${player_bet.slice(
      0,
      player_bet.length - 1
    )}"`
  );
  return output.stdout;
}

async function main() {
  const fed_printer_output = getOutput(await fed_printer())[0];
  const player_mint_output = getOutput(await player_mint())[0];
  const initialize_decks_output = getOutput(await initialize_decks())[0];
  const make_bet_output = getOutput(await make_bet(player_mint_output));
  const player_new_record = make_bet_output[0];
  const player_bet = make_bet_output[1];
  const play_game_output = getOutput(
    await play_game(initialize_decks_output, player_bet)
  );
  const player_returns = play_game_output[0];
  const player_game_result = play_game_output[1];

  console.log("Fed printer output: ", fed_printer_output);
  console.log("\n ========================== \n");
  console.log("Player chips record: ", player_mint_output);
  console.log("\n ========================== \n");
  console.log("Initialize decks: ", initialize_decks_output);
  console.log("\n ========================== \n");
  console.log("player_bet: ", player_bet);
  console.log("\n ========================== \n");
  console.log("player_returns: ", player_returns);
  console.log("\n ========================== \n");
  console.log("player_game_result: ", player_game_result);
}

main();
