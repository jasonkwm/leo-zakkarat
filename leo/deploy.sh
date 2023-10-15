PRIVATE_KEY="APrivateKey1zkp3jdRX18z53QSFnKnQWEHhPX6eDXhrJdHT4RQ1S4HjucP"
ENDPOINT="https://vm.aleo.org/api"
BROADCAST="https://vm.aleo.org/api/testnet3/transaction/broadcast"
FEE_AMOUNT="25000000"
FEE_RECORD="{
  owner: aleo1u3n9kfyfpkusdcxg25pqyc3ewptdv06uap7mpka3gavkpsvf2vpqqzq4k8.private,
  microcredits: 30000000u64.private,
  _nonce: 2269562468313671900600343900960660583280431623476450347867314380680193611450group.public
}"

snarkos developer deploy zakkarrat_hello_world.aleo \
    --private-key ${PRIVATE_KEY} \
    --query ${ENDPOINT} \
    --fee ${FEE_AMOUNT} \
    --record "${FEE_RECORD}" \
    --store "./deploy/deploy" \
    --path "./build/" \
    --broadcast ${BROADCAST} \
    # --dry-run



