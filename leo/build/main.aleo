program zakk.aleo;

struct Hands:
    first as u16;
    second as u16;

record CasinoDecks:
    owner as address.private;
    gates as u64.private;
    banker as Hands.private;
    player as Hands.private;
    last_two as Hands.private;
    uuid as u128.private;

record bet:
    owner as address.private;
    player as address.private;
    gates as u64.private;
    choice as u8.private;
    uuid as u128.private;
    amount as u64.private;

record chips:
    owner as address.private;
    gates as u64.private;
    amount as u64.private;

record game_result:
    owner as address.private;
    gates as u64.private;
    banker as Hands.private;
    player as Hands.private;
    last_two as Hands.private;
    uuid as u128.private;


mapping casino_balance:
	key as address.public;
	value as u64.public;

function fed_printer:
    input r0 as u64.public;
    assert.eq self.caller aleo1zmlpajf4fgvwcr4kcwq48j8xvcshcmwg8kaf3py96qt4atlajcfqrre0dg;
    async fed_printer self.caller r0 into r1;    output r1 as zakk.aleo/fed_printer.future;

finalize fed_printer:
    input r0 as address.public;
    input r1 as u64.public;
    get.or_use casino_balance[r0] 0u64 into r2;
    add r1 r2 into r3;
    set r3 into casino_balance[r0];


function initialize_decks:
    input r0 as Hands.private;
    input r1 as Hands.private;
    input r2 as Hands.private;
    input r3 as u128.private;
    assert.eq self.caller aleo1zmlpajf4fgvwcr4kcwq48j8xvcshcmwg8kaf3py96qt4atlajcfqrre0dg;
    cast self.caller 0u64 r0 r1 r2 r3 into r4 as CasinoDecks.record;
    output r4 as CasinoDecks.record;


function make_bet:
    input r0 as chips.record;
    input r1 as u8.private;
    input r2 as u64.private;
    input r3 as u128.public;
    assert.neq self.caller aleo1zmlpajf4fgvwcr4kcwq48j8xvcshcmwg8kaf3py96qt4atlajcfqrre0dg;
    sub r0.amount r2 into r4;
    cast self.caller 0u64 r4 into r5 as chips.record;
    cast aleo1zmlpajf4fgvwcr4kcwq48j8xvcshcmwg8kaf3py96qt4atlajcfqrre0dg self.caller 0u64 r1 r3 r2 into r6 as bet.record;
    async make_bet aleo1zmlpajf4fgvwcr4kcwq48j8xvcshcmwg8kaf3py96qt4atlajcfqrre0dg r2 into r7;    output r5 as chips.record;
    output r6 as bet.record;
    output r7 as zakk.aleo/make_bet.future;

finalize make_bet:
    input r0 as address.public;
    input r1 as u64.public;
    get.or_use casino_balance[r0] 0u64 into r2;
    add r1 r2 into r3;
    set r3 into casino_balance[r0];


function play_game:
    input r0 as CasinoDecks.record;
    input r1 as bet.record;
    add r0.banker.first r0.banker.second into r2;
    mod r2 10u16 into r3;
    add r0.player.first r0.player.second into r4;
    mod r4 10u16 into r5;
    is.eq false false into r6;
    is.eq r3 8u16 into r7;
    is.eq r3 9u16 into r8;
    or r7 r8 into r9;
    is.eq r5 8u16 into r10;
    or r9 r10 into r11;
    is.eq r5 9u16 into r12;
    or r11 r12 into r13;
    and r6 r13 into r14;
    ternary r14 true false into r15;
    is.eq r15 false into r16;
    is.eq r5 6u16 into r17;
    is.eq r5 7u16 into r18;
    or r17 r18 into r19;
    and r16 r19 into r20;
    ternary r20 0u16 0u16 into r21;
    is.eq r15 false into r22;
    lt r5 6u16 into r23;
    and r22 r23 into r24;
    ternary r24 r0.last_two.first r21 into r25;
    is.eq r15 false into r26;
    lt r3 3u16 into r27;
    and r26 r27 into r28;
    gt r25 0u16 into r29;
    ternary r29 r0.last_two.second r0.last_two.first into r30;
    ternary r28 r30 0u16 into r31;
    is.eq r15 false into r32;
    is.eq r3 3u16 into r33;
    and r32 r33 into r34;
    is.neq r25 8u16 into r35;
    gt r25 0u16 into r36;
    ternary r36 r0.last_two.second r0.last_two.first into r37;
    ternary r35 r37 r31 into r38;
    ternary r34 r38 r31 into r39;
    is.eq r15 false into r40;
    is.eq r3 4u16 into r41;
    and r40 r41 into r42;
    is.neq r25 1u16 into r43;
    is.neq r25 8u16 into r44;
    and r43 r44 into r45;
    is.neq r25 9u16 into r46;
    and r45 r46 into r47;
    is.neq r25 10u16 into r48;
    and r47 r48 into r49;
    gt r25 0u16 into r50;
    ternary r50 r0.last_two.second r0.last_two.first into r51;
    ternary r49 r51 r39 into r52;
    ternary r42 r52 r39 into r53;
    is.eq r15 false into r54;
    is.eq r3 5u16 into r55;
    and r54 r55 into r56;
    gt r25 3u16 into r57;
    lt r25 8u16 into r58;
    and r57 r58 into r59;
    gt r25 0u16 into r60;
    ternary r60 r0.last_two.second r0.last_two.first into r61;
    ternary r59 r61 r53 into r62;
    ternary r56 r62 r53 into r63;
    is.eq r15 false into r64;
    is.eq r3 6u16 into r65;
    and r64 r65 into r66;
    is.eq r25 6u16 into r67;
    is.eq r25 7u16 into r68;
    or r67 r68 into r69;
    gt r25 0u16 into r70;
    ternary r70 r0.last_two.second r0.last_two.first into r71;
    ternary r69 r71 r63 into r72;
    ternary r66 r72 r63 into r73;
    add r5 r25 into r74;
    add r3 r73 into r75;
    gt r74 r75 into r76;
    gt r75 r74 into r77;
    ternary r77 2u8 3u8 into r78;
    ternary r76 1u8 r78 into r79;
    is.eq r79 3u8 into r80;
    is.eq r1.choice r79 into r81;
    mul r1.amount 8u64 into r82;
    ternary r81 r82 r1.amount into r83;
    ternary r80 r83 0u64 into r84;
    is.eq r79 2u8 into r85;
    is.eq r1.choice r79 into r86;
    is.eq r75 6u16 into r87;
    div r1.amount 2u64 into r88;
    add r1.amount r88 into r89;
    mul r1.amount 2u64 into r90;
    ternary r87 r89 r90 into r91;
    ternary r86 r91 0u64 into r92;
    ternary r85 r92 r84 into r93;
    is.eq r79 1u8 into r94;
    is.eq r1.choice r79 into r95;
    mul r1.amount 2u64 into r96;
    ternary r95 r96 0u64 into r97;
    ternary r94 r97 r93 into r98;
    cast r1.player 0u64 r98 into r99 as chips.record;
    cast r1.player 0u64 r0.banker r0.player r0.last_two r0.uuid into r100 as game_result.record;
    async play_game self.caller r98 into r101;    output r99 as chips.record;
    output r100 as game_result.record;
    output r101 as zakk.aleo/play_game.future;

finalize play_game:
    input r0 as address.public;
    input r1 as u64.public;
    get.or_use casino_balance[r0] 0u64 into r2;
    sub r2 r1 into r3;
    set r3 into casino_balance[r0];
