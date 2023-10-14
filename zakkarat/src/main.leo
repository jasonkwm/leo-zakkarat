// The 'zakkarat' program.
program zakkarat.aleo {
    mapping account:address  => u64;
    mapping hashes:field  => field;
    record Token {
        owner: address,
        balance: u64,
    }

    struct GameHash{
        hash: field,
        salt: field,
    }

    transition deposit(receiver: address, amount: u64) -> Token {
        assert_eq(self.caller, aleo1cq3vpv6t6uhd2lnkaxtn79ygm6vled0wjmxeggyktkae59069ugs6cfxjf);
        return Token {
            owner: receiver,
            balance: amount
        };
    }

    transition fed_printer (amount: u64) {
        assert_eq(self.caller, aleo1cq3vpv6t6uhd2lnkaxtn79ygm6vled0wjmxeggyktkae59069ugs6cfxjf);
        return then finalize(amount);
    }

    finalize fed_printer (amount: u64) {
        let addr: address = aleo1cq3vpv6t6uhd2lnkaxtn79ygm6vled0wjmxeggyktkae59069ugs6cfxjf;
        let balance: u64 = Mapping::get_or_use(account, addr, 0u64);
        Mapping::set(account, addr, balance + amount);
    }

    // result: 0 = -amount, 1 = x1.5, 2 = x2, 3 = x8 
    transition store_game(token: Token, amount: u64, result: u8, hash: field, salt: field) -> (Token, GameHash) {
        assert(token.balance >= amount);
        assert(result == 0u8 || result == 1u8 || result == 2u8 || result == 3u8);

        let final_record:Token = Token {
            owner: token.owner,
            balance: 0u64,
        };
        let game_hash: GameHash = GameHash {
            hash: hash,
            salt: salt
        };
        if (result == 0u8) {
            final_record = Token {
                owner: token.owner,
                balance: token.balance - amount
            };
        } else if (result == 1u8) {
            final_record = Token {
                owner: token.owner,
                balance: token.balance + (amount / 2u64)
            };
        } else if (result == 2u8) {
            final_record = Token {
                owner: token.owner,
                balance: token.balance + amount
            };
        } else {
            final_record = Token {
                owner: token.owner,
                balance: token.balance + (amount * 8u64)
            };
        }
        return (final_record, game_hash) then finalize(amount, result, hash, salt);
    }

    finalize store_game (amount: u64, result: u8, hash: field, salt: field) {
        let addr: address = aleo1cq3vpv6t6uhd2lnkaxtn79ygm6vled0wjmxeggyktkae59069ugs6cfxjf;
        let balance: u64 = Mapping::get_or_use(account, addr, 0u64);
        let contains: bool = Mapping::contains(hashes, hash);
        assert(!contains);
        if (result == 0u8) {
            Mapping::set(account, addr, balance + amount);
        } else if (result == 1u8) {
            Mapping::set(account, addr, balance - (amount / 2u64));
        } else if (result == 2u8) {
            Mapping::set(account, addr, balance - amount);
        } else {
            assert(amount * 8u64 >= balance);
            Mapping::set(account, addr, balance - (amount * 8u64));
        }
        Mapping::set(hashes, hash, salt);
    }
}
