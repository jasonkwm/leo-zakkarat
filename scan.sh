ENDPOINT="https://apiv2.aleo.network/"
PUBLIC_ADDR="aleo1cq3vpv6t6uhd2lnkaxtn79ygm6vled0wjmxeggyktkae59069ugs6cfxjf"
VIEW_KEY="AViewKey1pq8FS62Dwzs2ac8CSvpfgD8tXd5qPdKCRZQRpArzbtMG"
BLOCKS="10000"
START="60000"
END="80000"

snarkos developer scan --endpoint "${ENDPOINT}" --view-key "${VIEW_KEY}" --start "${START}" --end "${END}"
