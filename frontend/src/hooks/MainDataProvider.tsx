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
};

export const MainDataContext = React.createContext({} as MainDataT);

export const MainDataProvider = ({ children }: { children: React.ReactNode }) => {
    const [userAccount, setUserAccount] = React.useState("");
    const [betOn, setBetOn] = React.useState<BetOnT>("");
    const [userChips, setUserChips] = React.useState("");
    const [tableList, setTableList] = React.useState<string[]>([]);
    const [selectedTable, setSelectedTable] = React.useState("");

    React.useEffect(() => {
        setTableList((prev) => [...prev, "5", "7", "21", "8", "15", "77", "126", "85"]);
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
