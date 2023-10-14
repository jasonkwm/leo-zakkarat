import { Button, Text } from "@chakra-ui/react";
import { useMainDataContext } from "@/hooks/MainDataProvider";

export default function BaccaratTable() {
    const { betOn, setBetOn, selectedTable } = useMainDataContext();
    return (
        <>
            <Text color={"white"} position={"absolute"} left={"35%"} top={"2.5%"}>
                Table No: {selectedTable}, Bets On: {betOn}
            </Text>
            <Button
                position={"absolute"}
                top={"19.70%"}
                left={"42.75%"}
                borderRadius={"50%"}
                width={"128px"}
                height={"128px"}
                background={"transparent"}
                border={"solid 1px yellow"}
                sx={{
                    "&:hover": {
                        transform: "scale(1.15)",
                        backgroundColor: "#FFFFFF1A",
                        border: "solid 1px yellow",
                    },
                    "&:active": {
                        transform: "scale(1.05)",
                    },
                }}
                onClick={() => setBetOn("tie")}
            ></Button>
            <Button
                position={"absolute"}
                top={"25.5%"}
                left={"3.2%"}
                borderRadius={"50%"}
                width={"340px"}
                height={"340px"}
                background={"transparent"}
                border={"solid 1px yellow"}
                sx={{
                    "&:hover": {
                        transform: "scale(1.1)",
                        backgroundColor: "#FFFFFF1A",
                        border: "solid 1px yellow",
                    },
                    "&:active": {
                        transform: "scale(1.05)",
                    },
                }}
                onClick={() => setBetOn("player")}
            ></Button>
            <Button
                position={"absolute"}
                top={"26%"}
                right={"3.4%"}
                borderRadius={"50%"}
                width={"340px"}
                height={"340px"}
                background={"transparent"}
                border={"solid 1px yellow"}
                sx={{
                    "&:hover": {
                        transform: "scale(1.1)",
                        backgroundColor: "#FFFFFF1A",
                        border: "solid 1px yellow",
                    },
                    "&:active": {
                        transform: "scale(1.05)",
                    },
                }}
                onClick={() => setBetOn("banker")}
            ></Button>
        </>
    );
}
