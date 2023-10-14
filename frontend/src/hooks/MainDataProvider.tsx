import React from "react";

export type BetOnT = "player" | "banker" | "tie" | "";

export type MainDataT = {
    userAccount: string;
    setUserAccount: (value: string) => void;
    betOn: BetOnT;
    setBetOn: (value: BetOnT) => void;
    userChips: string;
    setUserChips: (value: string) => void;
    tableList: string[];
    setTableList: (value: string[]) => void;
    selectedTable: string;
    setSelectedTable: (value: string) => void;
    betAmount: string;
    setBetAmount: (value: string) => void;
    playPrivateKey: string;
    setPlayPrivateKey: (value: string) => void;
    playAmount: string;
    setPlayAmount: (value: string) => void;
    playCreditsRecord: string;
    setPlayCreditsRecord: (value: string) => void;
    playSubmitStatus: boolean;
    setPlaySubmitStatus: (value: boolean) => void;
    mintTxn: string;
    setMintTxn: (value: string) => void;
};

export const MainDataContext = React.createContext({} as MainDataT);

export const MainDataProvider = ({ children }: { children: React.ReactNode }) => {
    const [userAccount, setUserAccount] = React.useState("");
    const [betOn, setBetOn] = React.useState<BetOnT>("");
    const [userChips, setUserChips] = React.useState("");
    const [tableList, setTableList] = React.useState<string[]>([]);
    const [selectedTable, setSelectedTable] = React.useState("");
    const [betAmount, setBetAmount] = React.useState("");
    const [playPrivateKey, setPlayPrivateKey] = React.useState("");
    const [playAmount, setPlayAmount] = React.useState("");
    const [playCreditsRecord, setPlayCreditsRecord] = React.useState("");
    const [playSubmitStatus, setPlaySubmitStatus] = React.useState(false);
    const [mintTxn, setMintTxn] = React.useState("");

    React.useEffect(() => {
        setTableList(["5", "7", "21", "8", "15", "77", "126", "85"]);
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
