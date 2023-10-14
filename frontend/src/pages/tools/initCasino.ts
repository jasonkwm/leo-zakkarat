import { Account, ProgramManager, AleoNetworkClient, NetworkRecordProvider, AleoKeyProvider } from "@aleohq/sdk";
import { zakkarat } from "./zakkarat";
import Deck from "../../logic/deck-class";

export async function initCasino(userPrivateKey: string) {
    const deck = new Deck();
    deck.shuffle();

    const sixCards = deck.dealSixCardsParseAsInt();
    const playerHands = `{first: ${sixCards[0]}u16, second: ${sixCards[2]}u16}`;
    const bankerHands = `{first: ${sixCards[1]}u16, second: ${sixCards[3]}u16}`;
    const lastTwoHands = `{first: ${sixCards[4]}u16, second: ${sixCards[5]}u16}`;
    const randomUuid = `${Math.floor(100000 + Math.random() * 900000)}u128`;
    const myAccount = new Account({
        privateKey: "APrivateKey1zkpBpPcEWWHi2V3t9XMUZcLCHXCQtc3PnkHXmLTzxVffk59",
    });

    const networkClient = new AleoNetworkClient("http://vm.aleo.org/api");
    const recordProvider = new NetworkRecordProvider(myAccount, networkClient);
    const keyProvider = new AleoKeyProvider();
    keyProvider.useCache(true);

    const programManager = new ProgramManager("http://vm.aleo.org/api", keyProvider, recordProvider);

    programManager.setAccount(myAccount);

    console.log(myAccount);
    console.log(networkClient);
    console.log(recordProvider);
    console.log(keyProvider);

    // input r0 as Hands.private;\n" +
    // "    input r1 as Hands.private;\n" +
    // "    input r2 as Hands.private;\n" +
    // "    input r3 as u128.private;\n" +
    try {
        const tx_id = await programManager.executeOffline(
            zakkarat,
            "initialize_decks",
            [playerHands, bankerHands, lastTwoHands, randomUuid],
            false
        );
        console.log(tx_id.getOutputs());
        return tx_id.getOutputs();
    } catch (e) {
        console.log(e);
        return;
    }
}
