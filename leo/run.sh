#!/bin/sh

CASINO_DECKS="{
  owner: aleo1zmlpajf4fgvwcr4kcwq48j8xvcshcmwg8kaf3py96qt4atlajcfqrre0dg.private,
  gates: 0u64.private,
  banker: {
    first: 5u16.private,
    second: 3u16.private
  },
  player: {
    first: 3u16.private,
    second: 6u16.private
  },
  last_two: {
    first: 1u16.private,
    second: 2u16.private
  },
  uuid: 123u128.private,
  _nonce: 3953978686933598624787017572450516482803228043432815334662899291739585558107group.public
}"

BET="{
  owner: aleo1zmlpajf4fgvwcr4kcwq48j8xvcshcmwg8kaf3py96qt4atlajcfqrre0dg.private,
  player: aleo1cd0g8j5ssfklkvzq8d98kd6s7yemjc5lzawpgm7v6mw9qwdrn5yssx84gp.private,
  gates: 0u64.private,
  choice: 1u8.private,
  uuid: 123u128.private,
  amount: 500u64.private,
  _nonce: 6342221431404094973392882093742621317428792304232263153919016833962699737646group.public
}"

leo run play_game "${CASINO_DECKS}" "${BET}"