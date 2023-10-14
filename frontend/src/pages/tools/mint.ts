import { Account, ProgramManager, AleoNetworkClient, NetworkRecordProvider, AleoKeyProvider } from "@aleohq/sdk";

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

    try {
        const tx_id = await programManager.execute("testdeploy19923.aleo", "mint", 5, false, [
            myAccount._address.to_string(),
            "1000u64",
        ]);
        console.log(tx_id);
        return tx_id;
    } catch (e) {
        console.log(e);
        return "";
    }
}
