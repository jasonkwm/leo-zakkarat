import React from "react";

export type BetOnT = "player" | "banker" | "tie" | "";

export type MainDataT = {
    userAccount: string;
    setUserAccount: (value: string) => void;
    betOn: BetOnT;
    setBetOn: (value: BetOnT) => void;
    userChips: string;
    setUserChips: (value: string) => void;
};

export const MainDataContext = React.createContext({} as MainDataT);

export const MainDataProvider = ({ children }: { children: React.ReactNode }) => {
    const [userAccount, setUserAccount] = React.useState("");
    const [betOn, setBetOn] = React.useState<BetOnT>("");
    const [userChips, setUserChips] = React.useState("");
    return (
        <MainDataContext.Provider
            value={{
                userAccount,
                setUserAccount,
                betOn,
                setBetOn,
                userChips,
                setUserChips,
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
