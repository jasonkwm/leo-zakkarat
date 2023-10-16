# ETHKL2023 Hackathon - Aleo track

Proof of concept fully-verifiable, privacy centric zero-knowledge Baccarat Game on Aleo.

## Problem Statement

### 1. Genuineness and trustworthiness of online casinos in question

There are an abundance of online gaming sites available in the market, be it legal or illegal ones. Right now, there is no way we could ensure that these gaming sites generate the games fairly and do not tamper with the game probability to increase the house edge.

Let us use Baccarat as an example - the expected return for every $1 a user betting on "Player" is $0.9874, which means that casino has a house edge of $0.0126 for every $1 a user bet. However should a casino decided to tweak the game generation algorithim to decrease user's winning expected return to $0.9700, it could go unnoticed by the user, but will increase the casino's long term profit on the game by more than 100%.

### 2. Privacy of user's on-chain betting

Most modern smart contract enabled blockchains utilizes a transparent account based model, and this makes users betting and other transaction on chain fully visible to anyone. This causes privacy concerns and potentially create legal risks for the user under certain jurisfiction.

## Solution:

We are building a fully-verifiable, privacy-centric zero-knowledge baccarat game on Aleo, that can ensures the genuineness of the game hands by storing the game hash on chain, and resolves the game result via zero-knowledge execution. Under Aleo's design, all transactions were essentially ciphered, and only the owner with the private key / view key of the record can view it.
This ensures the genuineness of the game and the pricavy of user's transaction at the same time.

## Resources

- Official Aleo [Documentation](https://developer.aleo.org/getting_started/)
- [Aleo Explorer](https://explorer.aleo.org/)
- A tools for you to decypher record, transfer and etc. [Aleo.tools](https://aleo.tools)
- @aleohq/sdk [documentation](https://github.com/AleoHQ/sdk/tree/testnet3/sdk)

# Get Started

Deployed program id: zakkarrat_hello_world.aleo
Deployment transaction id: at1ye7awvg5u8pu0twlxskt2q06zye9j8dzu5zsw5kac7u6wq5jus8sxw8wfv

## Requirement

- @aleo/sdk: 0.6.2
- snarkos cli: 2.1.7
- Next.js: 13.5.4

## To run frontend

1. cd into frontend

```bash
cd frontend
```

2. Install depencies

```bash
yarn install
```

3. Start dev

```bash
yarn dev
```

## To deploy zakkarat program

Note: You will need to do a `transfer_public_to_private` in order to get a private fee record for the deployment fee requiremnent.

1. Checkout branch (game) and cd into leo/

```bash
git checkout game
cd leo
```

2. Deploy using snarkos cli

```bash
PRIVATE_KEY=""
ENDPOINT="https://vm.aleo.org/api"
BROADCAST="https://vm.aleo.org/api/testnet3/transaction/broadcast"
FEE_AMOUNT="9000000"
FEE_RECORD=""

snarkos developer deploy zakkarrat_hello_world.aleo \
    --private-key ${PRIVATE_KEY} \
    --query ${ENDPOINT} \
    --fee ${FEE_AMOUNT} \
    --record "${FEE_RECORD}" \
    --store "./deploy/deploy" \
    --path "./build/" \
    --broadcast ${BROADCAST} \
    # --dry-run

```

---

Developing on Aleo is a total new experience for us, as Aleo's Blockchain utilizes UTXO mode which is very much different from Ethereum's Account-based model.

### 1. Leo programming language

- Leo is a functional programming language, due to how underlying ZK-Circuits work, Leo doesn't officially support strings and arrays as data types. This makes us to be more creative in designing our programme.

### 2. Not able to share state between different programs

- Due to the privacy centric nature of the network, different programs where not able to share states.

### 3. Bugs in Aleo-SDK

- We have encountered bugs during the usage of Aleo-SDK, and we have managed to dive into the node_module, find the bug and fix it. Examples of sdk usages were not up to date, there were some dependencies problems within the sdk. [PR #774](https://github.com/AleoHQ/sdk/pull/774)

### 4. Aleo Testnet3 Under Recalibration During Hackathon Period

- The testnet was under recalibration and causes our aleo programme not being able to deploy. We uses older version of SnarkOS to run a local Beacon node to test the deployment of our programmes.

## Contributors 
[<img src="https://github.com/hiromasa0629.png" width="60px;" display="inline;"/>](https://github.com/hiromasa0629) &emsp;&emsp;
[<img src="https://github.com/bunyod16.png" width="60px;"/>](https://github.com/bunyod16) &emsp;&emsp;
[<img src="https://github.com/alvinyap510.png" width="60px;"/>](https://github.com/alvinyap510) &emsp;&emsp;
[<img src="https://github.com/jasonkwm.png" width="60px;"/>](https://github.com/jasonkwm) &emsp;&emsp;


<a href="https://github.com/hiromasa0629">Hiromasa</a> &emsp;&emsp;
<a href="https://github.com/bunyod16">Bunyod</a> &emsp;&emsp;
<a href="https://github.com/alvinyap510">Alvin Yap</a> &emsp;&emsp;
<a href="https://github.com/jasonkwm">Jason Koh</a> &emsp;
