import { Button } from "@chakra-ui/react";
import { useMainDataContext } from "@/hooks/MainDataProvider";

export default function BaccaratTable() {
    const { setBetOn } = useMainDataContext();
    return (
        <>
            <Button
                position={"absolute"}
                top={"20%"}
                left={"43%"}
                borderRadius={"50%"}
                width={"124px"}
                height={"124px"}
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
                onClick={() => setBetOn("tie")}
            ></Button>
            <Button
                position={"absolute"}
                top={"26.5%"}
                left={"3.8%"}
                borderRadius={"50%"}
                width={"330px"}
                height={"330px"}
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
                top={"26.5%"}
                right={"3.9%"}
                borderRadius={"50%"}
                width={"330px"}
                height={"330px"}
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
