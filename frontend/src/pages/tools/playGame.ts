import {
  Account,
  ProgramManager,
  AleoNetworkClient,
  NetworkRecordProvider,
  AleoKeyProvider,
} from "@aleohq/sdk";
import { zakkarat } from "./zakkarat";

export async function playGame(casinoDecks: string, bet: string) {
  const myAccount = new Account({
    privateKey: "APrivateKey1zkpBpPcEWWHi2V3t9XMUZcLCHXCQtc3PnkHXmLTzxVffk59",
  });

  const networkClient = new AleoNetworkClient("http://vm.aleo.org/api");
  const recordProvider = new NetworkRecordProvider(myAccount, networkClient);
  const keyProvider = new AleoKeyProvider();
  keyProvider.useCache(true);

  const programManager = new ProgramManager(
    "http://vm.aleo.org/api",
    keyProvider,
    recordProvider
  );

  programManager.setAccount(myAccount);

  try {
    const tx_id = await programManager.executeOffline(
      zakkarat,
      "play_game",
      [casinoDecks, bet],
      false
    );
    console.log(tx_id.getOutputs());
    return tx_id.getOutputs();
  } catch (e) {
    console.log(e);
    return "";
  }
}
