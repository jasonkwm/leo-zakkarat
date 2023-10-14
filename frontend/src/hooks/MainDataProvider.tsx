import React from "react";

export type BetOnT = "player" | "banker" | "tie" | "";

export type MainDataT = {
  userAccount: string;
  setUserAccount: (value: string) => void;
  betOn: BetOnT;
  setBetOn: (value: BetOnT) => void;
  userChips: string[];
  setUserChips: (value: string[]) => void;
  //   userSelectedChip: string;
  //   setUserSelectedChip: (value: string) => void;
  tableList: string[];
  setTableList: (value: string[]) => void;
  tableListFull: string[];
  setTableListFull: (value: string[]) => void;
  selectedTable: string;
  setSelectedTable: (value: string) => void;
  betAmount: number;
  setBetAmount: (value: number) => void;
  playPrivateKey: string;
  setPlayPrivateKey: (value: string) => void;
  playAmount: number;
  setPlayAmount: (value: number) => void;
  playCreditsRecord: string;
  setPlayCreditsRecord: (value: string) => void;
  playSubmitStatus: boolean;
  setPlaySubmitStatus: (value: boolean) => void;
  mintTxn: string;
  setMintTxn: (value: string) => void;
  bets: string[];
  setBets: (value: string[]) => void;
};

export const MainDataContext = React.createContext({} as MainDataT);

const defaultFullTable = `{ 
    owner: aleo1zmlpajf4fgvwcr4kcwq48j8xvcshcmwg8kaf3py96qt4atlajcfqrre0dg.private, 
    gates: 0u64.private, 
    banker: { first: 10u16.private, second: 10u16.private }, 
    player: { first: 1u16.private, second: 10u16.private }, 
    last_two: { first: 3u16.private, second: 2u16.private }, 
    uuid: 123u128.private, 
    _nonce: 4952914555096027218744840892200714740164547438560966847487964876127727953737group.public 
}`;

const defaultBet = `{
  owner: aleo1zmlpajf4fgvwcr4kcwq48j8xvcshcmwg8kaf3py96qt4atlajcfqrre0dg.private,
  player: aleo1cd0g8j5ssfklkvzq8d98kd6s7yemjc5lzawpgm7v6mw9qwdrn5yssx84gp.private,
  gates: 0u64.private,
  choice: 1u8.private,
  uuid: 123u128.private,
  amount: 500u64.private,
  _nonce: 6941958709795347293887411597568396895896172871553772588181483218643610346372group.public
}`;

export const MainDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userAccount, setUserAccount] = React.useState("");
  const [betOn, setBetOn] = React.useState<BetOnT>("");
  const [userChips, setUserChips] = React.useState<string[]>([]);
  const [tableList, setTableList] = React.useState<string[]>([]);
  const [selectedTable, setSelectedTable] = React.useState("");
  const [betAmount, setBetAmount] = React.useState<number>(0);
  const [playPrivateKey, setPlayPrivateKey] = React.useState("");
  const [playAmount, setPlayAmount] = React.useState<number>(0);
  const [playCreditsRecord, setPlayCreditsRecord] = React.useState("");
  const [playSubmitStatus, setPlaySubmitStatus] = React.useState(false);
  const [mintTxn, setMintTxn] = React.useState("");
  const [bets, setBets] = React.useState<string[]>([defaultBet]);
  const [tableListFull, setTableListFull] = React.useState<string[]>([
    defaultFullTable,
  ]);
  //   const [userSelectedChip, setUserSelectedChip] = React.useState("");

  React.useEffect(() => {
    setTableList([]);
  }, []);
  return (
    <MainDataContext.Provider
      value={{
        userAccount,
        setUserAccount,
        betOn,
        setBetOn,
        userChips,
        setUserChips,
        tableList,
        setTableList,
        selectedTable,
        setSelectedTable,
        betAmount,
        setBetAmount,
        playPrivateKey,
        setPlayPrivateKey,
        playAmount,
        setPlayAmount,
        playCreditsRecord,
        setPlayCreditsRecord,
        playSubmitStatus,
        setPlaySubmitStatus,
        mintTxn,
        setMintTxn,
        bets,
        setBets,
        tableListFull,
        setTableListFull,
      }}
    >
      {children}
    </MainDataContext.Provider>
  );
};

export const useMainDataContext = () => {
  const TGEData = React.useContext(MainDataContext);

  return TGEData;
};
