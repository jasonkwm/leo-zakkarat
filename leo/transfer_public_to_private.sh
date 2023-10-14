PRIVATE_KEY="APrivateKey1zkp8CZNn3yeCseEtxuVPbDCwSyhGW6yZKUYKfgXmcpoGPWH"
ENDPOINT="http://localhost:3030"
BROADCAST="http://localhost:3030/testnet3/transaction/broadcast"
ADDRESS="aleo1zmlpajf4fgvwcr4kcwq48j8xvcshcmwg8kaf3py96qt4atlajcfqrre0dg"
RECORD="{  owner: aleo1rhgdu77hgyqd3xjj8ucu3jj9r2krwz6mnzyd80gncr5fxcwlh5rsvzp9px.private,  microcredits: 274000000000000u64.private,  _nonce: 5178757040790260837148639359892987870623779730104995727962114102970899467840group.public}"
FEE="1000000"
FEE_RECORD="{  owner: aleo1rhgdu77hgyqd3xjj8ucu3jj9r2krwz6mnzyd80gncr5fxcwlh5rsvzp9px.private,  microcredits: 274000000000000u64.private,  _nonce: 7589685531629559401790611201182570260600451676881386900478125557318358672419group.public}"



snarkos developer execute "credits.aleo" "transfer_private" "${RECORD}" "${ADDRESS}" "204000000000000u64" \
    --private-key "${PRIVATE_KEY}" \
    --query "${ENDPOINT}" \
    --dry-run \
    --fee "${FEE}" \
    --record ${FEE_RECORD} \
    # --broadcast "${BROADCAST}" \


