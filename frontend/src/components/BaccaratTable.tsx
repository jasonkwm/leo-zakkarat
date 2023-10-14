import { Button } from "@chakra-ui/react";

export default function BaccaratTable() {
    return (
        <>
            <Button
                position={"absolute"}
                top={"19.5%"}
                left={"43.25%"}
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
            ></Button>
            <Button
                position={"absolute"}
                top={"26%"}
                left={"4.2%"}
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
            ></Button>
            <Button
                position={"absolute"}
                top={"26%"}
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
            ></Button>
        </>
    );
}
