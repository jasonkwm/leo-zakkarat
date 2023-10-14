# leo-zakkarat
Baccarat in Aleo


# To deploy

- Create a record that you will consume to deploy the programme
```sh
snarkos developer execute --private-key "{PRIVATE_KEY}" --query "https://api.explorer.aleo.org/v1" "credits.aleo" "transfer_public_to_private" "{WALLET_ADDRESS}" "10000000u64" --broadcast "https://vm.aleo.org/api/testnet3/transaction/broadcast"
```

- Use the tx_id from the output to view the cyphertext, decrypt it using aleo.tools -> record and your private key

```bash
WALLETADDRESS="{YOUR WALLET ADDRESS}"
PRIVATEKEY="{YOUR PRIVATE KEY}"

APPNAME="{YOUR_APP_NAME}"

RECORD="{
 DECRPYTED RECORD HERE, P.S DONT REMOVE SUFFIXES
}"

cd .. && snarkos developer deploy "${APPNAME}.aleo" --private-key "${PRIVATEKEY}" --query "https://api.explorer.aleo.org/v1" --path "./${APPNAME}/build/" --broadcast "https://vm.aleo.org/api/testnet3/transaction/broadcast" --fee 1000000 --record "${RECORD}"
```