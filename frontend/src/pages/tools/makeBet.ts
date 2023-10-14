import {
  Account,
  ProgramManager,
  AleoNetworkClient,
  NetworkRecordProvider,
  AleoKeyProvider,
} from "@aleohq/sdk";
import { zakkarat } from "./zakkarat";
import { BetOnT } from "@/hooks/MainDataProvider";

export async function makeBet(
  playerChips: string,
  playerChoice: BetOnT,
  playerBetAmount: number,
  playerPrivateKey: string,
  uuid: number
) {
  const myAccount = new Account({
    privateKey: playerPrivateKey,
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

  let choice = 0;
  if (playerChoice == "banker") choice = 1;
  else if (playerChoice == "player") choice = 2;
  else if (playerChoice == "tie") choice = 3;

  try {
    const tx_id = await programManager.executeOffline(
      zakkarat,
      "make_bet",
      [playerChips, `${choice}u8`, `${playerBetAmount}u64`, `${uuid}u128`],
      false
    );
  } catch (e) {
    console.log(e);
    return "";
  }
}
