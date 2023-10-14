import { createHash, randomBytes } from "crypto";
/***
 * Creation of the Deck Class and return in to frontend
 * ***/

class Deck {
    /*** Constructor Function***/
    constructor() {
        this.deckSequence = [];
        this.initDeck();
    }

    /*** Initialize a new deck ***/
    initDeck() {
        let suits = ["♠️", "❤️", "♣️", "♦️"];
        let ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K"];
        for (let suit of suits) {
            for (let rank of ranks) {
                this.deckSequence.push(suit + rank);
            }
        }
        this.originalDeck = [...this.deckSequence];
    }

    /*** Shuffle deck using Fisher-Yates Algorithm ***/
    /* Math.ramdom() is pseudoramdom */
    /* Depends of browser, it will use different seed to generate the randomness */
    shuffle() {
        for (let i = this.deckSequence.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.deckSequence[i], this.deckSequence[j]] = [this.deckSequence[j], this.deckSequence[i]];
        }
    }

    /*** Hash the current sequence with salt and return the hash ***/
    hashState() {
        let sequence = "";
        for (let i = 0; i < 6; i++) {
            let card = this.deckSequence[i];
            let index = this.originalDeck.indexOf(card) + 1;
            sequence += index.toString().padStart(2, "0");
        }
        let salt = randomBytes(16).toString("hex");
        this.storedProofSequence = sequence;
        this.storedSalt = salt;

        return createHash("md5")
            .update(salt + sequence)
            .digest("hex");
    }

    /*** Given salt and sequence, verify the hahs ***/
    verifyHash(salt, sequence, hash) {
        return (
            createHash("md5")
                .update(salt + sequence)
                .digest("hex") == hash
        );
    }

    returnStoredSequence() {
        return this.storedProofSequence;
    }

    returnStoredSalt() {
        return this.storedSalt;
    }

    parseSequenceToCards(sequenceNumber) {
        let sequenceString = sequenceNumber.toString();

        let cardSequence = [];
        for (let i = 0; i < sequenceString.length; i += 2) {
            let index = parseInt(sequenceString.slice(i, i + 2), 10) - 1;
            cardSequence.push(this.originalDeck[index]);
        }
        return cardSequence;
    }

    /* Deal a card from the top of the deck */
    deal() {
        const card = this.deckSequence.shift();
        return card;
    }

    dealSixCards() {
        const sixCards = [];
        for (let i = 0; i < 6; i++) {
            sixCards.push(this.deal());
        }
        return sixCards;
    }

    dealSixCardsParseAsInt() {
        const cardValues = {
            A: 1,
            T: 10,
            J: 10,
            Q: 10,
            K: 10,
        };
        const sixCards = this.dealSixCards();
        const sixCardsParseInt = sixCards.map((card) => {
            const cardFace = card.slice(2);
            return cardValues[cardFace] || parseInt(cardFace, 10);
        });
        return sixCardsParseInt;
    }

    dealSixCardsByDeckIndex() {
        const sixCards = this.dealSixCards();
        const sixCardsByIndex = [];
        for (let i = 0; i < sixCards.length; i++) {
            let card = sixCards[i];
            let index = this.originalDeck.indexOf(card) + 1;
            sixCardsByIndex.push(index);
        }
        return sixCardsByIndex;
    }
}

export default Deck;

// /*** Check whether the deck is propally initialized ***/
// const myDeck = new Deck();
// myDeck.shuffle();
// // Check Sequence
// console.log(myDeck.deckSequence);
// // Hash the current state
// hash = myDeck.hashState();
// // Print the state hahs
// console.log("Sequence State Hash :", hash);
// // Return stored sequence for verification after game
// sequence = myDeck.returnStoredSequence();
// console.log("Sequence: ", sequence);
// // Return stored salt for verification after game
// salt = myDeck.returnStoredSalt();
// // Verify the genuinity of the game
// console.log("Salt: ", salt);
// console.log(myDeck.verifyHash(salt, sequence, hash));
// // Convert hex hash to decimals
// const decimalHash = BigInt(`0x${hash}`).toString(10);
// console.log(decimalHash);

// console.log(myDeck.parseSequenceToCards(sequence));
