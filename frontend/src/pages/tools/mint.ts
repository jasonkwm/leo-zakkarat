import { Account, ProgramManager, AleoNetworkClient, NetworkRecordProvider, AleoKeyProvider } from "@aleohq/sdk";
import { zakkarat } from "./zakkarat";

export async function mint(userPrivateKey: string) {
    const myAccount = new Account({
        privateKey: userPrivateKey,
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

    console.log(myAccount);
    console.log(networkClient);
    console.log(recordProvider);
    console.log(keyProvider);

    try {
        const tx_id = await programManager.executeOffline(zakkarat, "player_mint", ["1000u64"], false);
        console.log(tx_id.getOutputs());
        return tx_id.getOutputs();
    } catch (e) {
        console.log(e);
        return "";
    }
}
