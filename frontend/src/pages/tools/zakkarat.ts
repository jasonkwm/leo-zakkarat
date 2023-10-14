export const zakkarat =
  "program zakk.aleo;\n" +
  "\n" +
  "struct Hands:\n" +
  "    first as u16;\n" +
  "    second as u16;\n" +
  "\n" +
  "struct GameResult:\n" +
  "    banker as Hands;\n" +
  "    player as Hands;\n" +
  "    last_two as Hands;\n" +
  "\n" +
  "record CasinoDecks:\n" +
  "    owner as address.private;\n" +
  "    gates as u64.private;\n" +
  "    banker as Hands.private;\n" +
  "    player as Hands.private;\n" +
  "    last_two as Hands.private;\n" +
  "    uuid as u128.private;\n" +
  "\n" +
  "record bet:\n" +
  "    owner as address.private;\n" +
  "    player as address.private;\n" +
  "    gates as u64.private;\n" +
  "    choice as u8.private;\n" +
  "    uuid as u128.private;\n" +
  "    amount as u64.private;\n" +
  "\n" +
  "record chips:\n" +
  "    owner as address.private;\n" +
  "    gates as u64.private;\n" +
  "    amount as u64.private;\n" +
  "\n" +
  "record game_result:\n" +
  "    owner as address.private;\n" +
  "    gates as u64.private;\n" +
  "    banker as Hands.private;\n" +
  "    player as Hands.private;\n" +
  "    last_two as Hands.private;\n" +
  "    uuid as u128.private;\n" +
  "\n" +
  "\n" +
  "mapping casino_balance:\n" +
  "	key as address.public;\n" +
  "	value as u64.public;\n" +
  "\n" +
  "\n" +
  "mapping casino_history:\n" +
  "	key as u128.public;\n" +
  "	value as GameResult.public;\n" +
  "\n" +
  "function fed_printer:\n" +
  "    input r0 as u64.public;\n" +
  "    assert.eq self.caller aleo1zmlpajf4fgvwcr4kcwq48j8xvcshcmwg8kaf3py96qt4atlajcfqrre0dg;\n" +
  "    async fed_printer self.caller r0 into r1;    output r1 as zakk.aleo/fed_printer.future;\n" +
  "\n" +
  "finalize fed_printer:\n" +
  "    input r0 as address.public;\n" +
  "    input r1 as u64.public;\n" +
  "    get.or_use casino_balance[r0] 0u64 into r2;\n" +
  "    add r1 r2 into r3;\n" +
  "    set r3 into casino_balance[r0];\n" +
  "\n" +
  "\n" +
  "function player_mint:\n" +
  "    input r0 as u64.private;\n" +
  "    assert.neq self.caller aleo1zmlpajf4fgvwcr4kcwq48j8xvcshcmwg8kaf3py96qt4atlajcfqrre0dg;\n" +
  "    cast self.caller 0u64 r0 into r1 as chips.record;\n" +
  "    output r1 as chips.record;\n" +
  "\n" +
  "\n" +
  "function initialize_decks:\n" +
  "    input r0 as Hands.private;\n" +
  "    input r1 as Hands.private;\n" +
  "    input r2 as Hands.private;\n" +
  "    input r3 as u128.private;\n" +
  "    assert.eq self.caller aleo1zmlpajf4fgvwcr4kcwq48j8xvcshcmwg8kaf3py96qt4atlajcfqrre0dg;\n" +
  "    cast self.caller 0u64 r0 r1 r2 r3 into r4 as CasinoDecks.record;\n" +
  "    output r4 as CasinoDecks.record;\n" +
  "\n" +
  "\n" +
  "function make_bet:\n" +
  "    input r0 as chips.record;\n" +
  "    input r1 as u8.private;\n" +
  "    input r2 as u64.private;\n" +
  "    input r3 as u128.public;\n" +
  "    assert.neq self.caller aleo1zmlpajf4fgvwcr4kcwq48j8xvcshcmwg8kaf3py96qt4atlajcfqrre0dg;\n" +
  "    sub r0.amount r2 into r4;\n" +
  "    cast self.caller 0u64 r4 into r5 as chips.record;\n" +
  "    cast aleo1zmlpajf4fgvwcr4kcwq48j8xvcshcmwg8kaf3py96qt4atlajcfqrre0dg self.caller 0u64 r1 r3 r2 into r6 as bet.record;\n" +
  "    async make_bet aleo1zmlpajf4fgvwcr4kcwq48j8xvcshcmwg8kaf3py96qt4atlajcfqrre0dg r2 into r7;    output r5 as chips.record;\n" +
  "    output r6 as bet.record;\n" +
  "    output r7 as zakk.aleo/make_bet.future;\n" +
  "\n" +
  "finalize make_bet:\n" +
  "    input r0 as address.public;\n" +
  "    input r1 as u64.public;\n" +
  "    get.or_use casino_balance[r0] 0u64 into r2;\n" +
  "    add r1 r2 into r3;\n" +
  "    set r3 into casino_balance[r0];\n" +
  "\n" +
  "\n" +
  "function play_game:\n" +
  "    input r0 as CasinoDecks.record;\n" +
  "    input r1 as bet.record;\n" +
  "    add r0.banker.first r0.banker.second into r2;\n" +
  "    mod r2 10u16 into r3;\n" +
  "    add r0.player.first r0.player.second into r4;\n" +
  "    mod r4 10u16 into r5;\n" +
  "    is.eq false false into r6;\n" +
  "    is.eq r3 8u16 into r7;\n" +
  "    is.eq r3 9u16 into r8;\n" +
  "    or r7 r8 into r9;\n" +
  "    is.eq r5 8u16 into r10;\n" +
  "    or r9 r10 into r11;\n" +
  "    is.eq r5 9u16 into r12;\n" +
  "    or r11 r12 into r13;\n" +
  "    and r6 r13 into r14;\n" +
  "    ternary r14 true false into r15;\n" +
  "    is.eq r15 false into r16;\n" +
  "    is.eq r5 6u16 into r17;\n" +
  "    is.eq r5 7u16 into r18;\n" +
  "    or r17 r18 into r19;\n" +
  "    and r16 r19 into r20;\n" +
  "    ternary r20 0u16 0u16 into r21;\n" +
  "    is.eq r15 false into r22;\n" +
  "    lt r5 6u16 into r23;\n" +
  "    and r22 r23 into r24;\n" +
  "    ternary r24 r0.last_two.first r21 into r25;\n" +
  "    is.eq r15 false into r26;\n" +
  "    lt r3 3u16 into r27;\n" +
  "    and r26 r27 into r28;\n" +
  "    gt r25 0u16 into r29;\n" +
  "    ternary r29 r0.last_two.second r0.last_two.first into r30;\n" +
  "    ternary r28 r30 0u16 into r31;\n" +
  "    is.eq r15 false into r32;\n" +
  "    is.eq r3 3u16 into r33;\n" +
  "    and r32 r33 into r34;\n" +
  "    is.neq r25 8u16 into r35;\n" +
  "    gt r25 0u16 into r36;\n" +
  "    ternary r36 r0.last_two.second r0.last_two.first into r37;\n" +
  "    ternary r35 r37 r31 into r38;\n" +
  "    ternary r34 r38 r31 into r39;\n" +
  "    is.eq r15 false into r40;\n" +
  "    is.eq r3 4u16 into r41;\n" +
  "    and r40 r41 into r42;\n" +
  "    is.neq r25 1u16 into r43;\n" +
  "    is.neq r25 8u16 into r44;\n" +
  "    and r43 r44 into r45;\n" +
  "    is.neq r25 9u16 into r46;\n" +
  "    and r45 r46 into r47;\n" +
  "    is.neq r25 10u16 into r48;\n" +
  "    and r47 r48 into r49;\n" +
  "    gt r25 0u16 into r50;\n" +
  "    ternary r50 r0.last_two.second r0.last_two.first into r51;\n" +
  "    ternary r49 r51 r39 into r52;\n" +
  "    ternary r42 r52 r39 into r53;\n" +
  "    is.eq r15 false into r54;\n" +
  "    is.eq r3 5u16 into r55;\n" +
  "    and r54 r55 into r56;\n" +
  "    gt r25 3u16 into r57;\n" +
  "    lt r25 8u16 into r58;\n" +
  "    and r57 r58 into r59;\n" +
  "    gt r25 0u16 into r60;\n" +
  "    ternary r60 r0.last_two.second r0.last_two.first into r61;\n" +
  "    ternary r59 r61 r53 into r62;\n" +
  "    ternary r56 r62 r53 into r63;\n" +
  "    is.eq r15 false into r64;\n" +
  "    is.eq r3 6u16 into r65;\n" +
  "    and r64 r65 into r66;\n" +
  "    is.eq r25 6u16 into r67;\n" +
  "    is.eq r25 7u16 into r68;\n" +
  "    or r67 r68 into r69;\n" +
  "    gt r25 0u16 into r70;\n" +
  "    ternary r70 r0.last_two.second r0.last_two.first into r71;\n" +
  "    ternary r69 r71 r63 into r72;\n" +
  "    ternary r66 r72 r63 into r73;\n" +
  "    add r5 r25 into r74;\n" +
  "    add r3 r73 into r75;\n" +
  "    gt r74 r75 into r76;\n" +
  "    gt r75 r74 into r77;\n" +
  "    ternary r77 2u8 3u8 into r78;\n" +
  "    ternary r76 1u8 r78 into r79;\n" +
  "    is.eq r79 3u8 into r80;\n" +
  "    is.eq r1.choice r79 into r81;\n" +
  "    mul r1.amount 8u64 into r82;\n" +
  "    ternary r81 r82 r1.amount into r83;\n" +
  "    ternary r80 r83 0u64 into r84;\n" +
  "    is.eq r79 2u8 into r85;\n" +
  "    is.eq r1.choice r79 into r86;\n" +
  "    is.eq r75 6u16 into r87;\n" +
  "    div r1.amount 2u64 into r88;\n" +
  "    add r1.amount r88 into r89;\n" +
  "    mul r1.amount 2u64 into r90;\n" +
  "    ternary r87 r89 r90 into r91;\n" +
  "    ternary r86 r91 0u64 into r92;\n" +
  "    ternary r85 r92 r84 into r93;\n" +
  "    is.eq r79 1u8 into r94;\n" +
  "    is.eq r1.choice r79 into r95;\n" +
  "    mul r1.amount 2u64 into r96;\n" +
  "    ternary r95 r96 0u64 into r97;\n" +
  "    ternary r94 r97 r93 into r98;\n" +
  "    cast r1.player 0u64 r98 into r99 as chips.record;\n" +
  "    cast r1.player 0u64 r0.banker r0.player r0.last_two r0.uuid into r100 as game_result.record;\n" +
  "    async play_game self.caller r98 r0.banker r0.player r0.last_two r0.uuid into r101;    output r99 as chips.record;\n" +
  "    output r100 as game_result.record;\n" +
  "    output r101 as zakk.aleo/play_game.future;\n" +
  "\n" +
  "finalize play_game:\n" +
  "    input r0 as address.public;\n" +
  "    input r1 as u64.public;\n" +
  "    input r2 as Hands.public;\n" +
  "    input r3 as Hands.public;\n" +
  "    input r4 as Hands.public;\n" +
  "    input r5 as u128.public;\n" +
  "    get.or_use casino_balance[r0] 0u64 into r6;\n" +
  "    sub r6 r1 into r7;\n" +
  "    set r7 into casino_balance[r0];\n" +
  "    cast r2 r3 r4 into r8 as GameResult;\n" +
  "    set r8 into casino_history[r5];\n";
