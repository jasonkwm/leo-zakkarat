// The 'leo' program.
program zakk.aleo {
    mapping casino_balance: address => u64;

    mapping casino_history: u128 => GameResult;

    struct GameResult {
        banker: Hands,
        player: Hands,
        last_two: Hands
    }

    struct Hands {
        first: u16,
        second: u16,
    }
    
    record CasinoDecks {
        owner: address, // Casino owner
        gates: u64,
        banker: Hands,
        player: Hands,
        last_two: Hands,
        uuid: u128,
    }

    record bet {
        owner: address,  // Casino
        player: address,
        gates: u64,
        choice: u8,
        uuid: u128,
        amount: u64,
    }

    record chips {
        owner: address,  // player
        gates: u64,
        amount: u64,
    }

    record game_result {
        owner: address,  // player
        gates: u64,
        banker: Hands,
        player: Hands,
        last_two: Hands,
        uuid: u128,
    }

    // Casino able to print the money. So player can see the balance
    transition fed_printer(public amount: u64) {
        assert_eq(self.caller, aleo1zmlpajf4fgvwcr4kcwq48j8xvcshcmwg8kaf3py96qt4atlajcfqrre0dg);

        return then finalize(self.caller, amount);
    }

    finalize fed_printer(public receiver: address, public amount: u64) {
        let current_amount: u64 = Mapping::get_or_use(casino_balance, receiver, 0u64);
        Mapping::set(casino_balance, receiver, amount + current_amount);
    }

    // Player Mint
    transition player_mint(private amount: u64) -> chips {
        assert_neq(self.caller, aleo1zmlpajf4fgvwcr4kcwq48j8xvcshcmwg8kaf3py96qt4atlajcfqrre0dg);

        let new_chips: chips = chips {
            owner: self.caller,
            gates: 0u64,
            amount: amount
        };

        return new_chips;
    }

    // Only casino owner can call
    transition initialize_decks(private banker: Hands, private player: Hands, private last_two: Hands, uuid: u128) -> CasinoDecks {
        assert_eq(self.caller, aleo1zmlpajf4fgvwcr4kcwq48j8xvcshcmwg8kaf3py96qt4atlajcfqrre0dg);

        let new_casino_deck: CasinoDecks = CasinoDecks {
            owner: self.caller,    
            gates: 0u64,
            banker: banker,
            player: player,
            last_two: last_two,
            uuid: uuid
        };

        return new_casino_deck;
    }

    // Player make bets. Generate a bet to casino
    transition make_bet(private player_balance: chips, private choice: u8, private amount: u64, public uuid: u128) -> (chips, bet) {
        assert_neq(self.caller, aleo1zmlpajf4fgvwcr4kcwq48j8xvcshcmwg8kaf3py96qt4atlajcfqrre0dg);  // Player cant be casino owner

        let new_balance: u64 = player_balance.amount - amount;

        let new_player_chips: chips = chips {
            owner: self.caller,
            gates: 0u64,
            amount: new_balance
        };

        let new_bet: bet = bet {
            owner: aleo1zmlpajf4fgvwcr4kcwq48j8xvcshcmwg8kaf3py96qt4atlajcfqrre0dg,
            player: self.caller,
            gates: 0u64,
            choice: choice,
            uuid: uuid,
            amount: amount
        };

        return (new_player_chips, new_bet) then finalize(aleo1zmlpajf4fgvwcr4kcwq48j8xvcshcmwg8kaf3py96qt4atlajcfqrre0dg, amount);
    }

    finalize make_bet(public receiver: address, public amount: u64) {
        let current_amount: u64 = Mapping::get_or_use(casino_balance, receiver, 0u64);
        Mapping::set(casino_balance, receiver, amount + current_amount);
    }

    // Casino scan and find the matching uuid between bets and CasinoDecks, then play the game. All done in frontend.
    // Called by casino owner
    transition play_game(private decks: CasinoDecks, private player_bet: bet) -> (chips, game_result) {
        let banker_hands: u16 = (decks.banker.first + decks.banker.second).mod(10u16);
        let banker_third_card: u16 = 0u16;
        let player_hands: u16 = (decks.player.first + decks.player.second).mod(10u16);
        let player_third_card: u16 = 0u16;
        let hasWin: bool = false;

        // If both side is 8/9
        if (hasWin == false && 
            (banker_hands == 8u16 || banker_hands == 9u16 || player_hands == 8u16 || player_hands == 9u16)) {
            hasWin = true;
        }

        // If Player gets 6/7, player stands
        if (hasWin == false &&
            (player_hands == 6u16 || player_hands == 7u16)) {
            player_third_card = 0u16;
        }

        // if player got 5 - 0, draw a card
        if (hasWin == false && player_hands < 6u16) {
            player_third_card = decks.last_two.first;
        }

        // If banker hands is 0/1/2, draw a card
        if (hasWin == false && banker_hands < 3u16) {
            if (player_third_card > 0u16) {
                banker_third_card = decks.last_two.second;
            } else {
                banker_third_card = decks.last_two.first;
            }
        }

        // Banker Draw a card if banker is 3 and player third card is not 8
        if (hasWin == false && banker_hands == 3u16) {
            if (player_third_card != 8u16) {
                if (player_third_card > 0u16) {
                    banker_third_card = decks.last_two.second;
                } else {
                    banker_third_card = decks.last_two.first;
                }
            }
        }

        // Banker draw a card if banker is 4 and player third card is not 1/8/9/10
        if (hasWin == false && banker_hands == 4u16) {
            if (player_third_card != 1u16 && player_third_card != 8u16 && player_third_card != 9u16 && player_third_card != 10u16) {
                if (player_third_card > 0u16) {
                    banker_third_card = decks.last_two.second;
                } else {
                    banker_third_card = decks.last_two.first;
                }
            }
        }

        // Banker draw a card if banker is 5 and player third card is 4/5/6/7
        if (hasWin == false && banker_hands == 5u16) {
            if (player_third_card > 3u16 && player_third_card < 8u16) {
                if (player_third_card > 0u16) {
                    banker_third_card = decks.last_two.second;
                } else {
                    banker_third_card = decks.last_two.first;
                }
            }
        }

        // Banker draw a card if banker is 6 and player third card is 6/7
        if (hasWin == false && banker_hands == 6u16) {
            if (player_third_card == 6u16 || player_third_card == 7u16) {
                if (player_third_card > 0u16) {
                    banker_third_card = decks.last_two.second;
                } else {
                    banker_third_card = decks.last_two.first;
                }
            }
        }

        player_hands += player_third_card;
        banker_hands += banker_third_card;

        let winner: u8 = 0u8;

        if (player_hands > banker_hands) {
            winner = 1u8;
        } else if (banker_hands > player_hands) {
            winner = 2u8;
        } else {
            winner = 3u8;
        }

        let returning_amount: u64 = 0u64;

        // If result is tie
        if (winner == 3u8) {
            if (player_bet.choice == winner) {
                returning_amount = player_bet.amount * 8u64;
            } else {
                returning_amount = player_bet.amount;
            }
        }

        // If result is banker
        if (winner == 2u8) {
            if (player_bet.choice == winner) {
                if (banker_hands == 6u16) {
                    returning_amount = player_bet.amount + (player_bet.amount / 2u64);
                } else {
                    returning_amount = player_bet.amount * 2u64;
                }
            } else {
                returning_amount = 0u64;
            }
        }

        // If result is player
        if (winner == 1u8) {
            if (player_bet.choice == winner) {
                returning_amount = player_bet.amount * 2u64;
            } else {
                returning_amount = 0u64;
            }
        }

        let chips_for_player: chips = chips {
            owner: player_bet.player,
            gates: 0u64,
            amount: returning_amount
        };

        let game_result_for_player: game_result = game_result {
            owner: player_bet.player,
            gates: 0u64,
            banker: decks.banker,
            player: decks.player,
            last_two: decks.last_two,
            uuid: decks.uuid
        };

        return (chips_for_player, game_result_for_player) 
            then finalize(self.caller, returning_amount, decks.banker, decks.player, decks.last_two, decks.uuid);
    }

    finalize play_game(public receiver: address, public amount: u64, public banker: Hands, public player: Hands, public last_two: Hands, public uuid: u128) {
        let current_amount: u64 = Mapping::get_or_use(casino_balance, receiver, 0u64);
        Mapping::set(casino_balance, receiver, current_amount - amount);
        let gameResult: GameResult = GameResult {
            banker: banker,
            player: player,
            last_two: last_two
        };
        Mapping::set(casino_history, uuid, gameResult);
    }
}  
