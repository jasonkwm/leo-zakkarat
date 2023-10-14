import React from "react";
import { Box, Button, Heading, Input, Text } from "@chakra-ui/react";
import MainComponent from "@/components/MainComponent";
import { mint } from "./tools/mint";

async function test () {
    return "yes";
}

export default function Mint() {
    const [amount, setAmount] = React.useState("");
    const [success, setSuccess] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [address, setAddress] = React.useState("");
    const [loadingText, setLoadingText] = React.useState("Submit");

    async function onSubmit() {
        setLoading(true);
        const result = await mint(address);
        result ? setLoadingText("Success") : setLoadingText("Failed");
        setLoading(false);
    }

    return (
        <MainComponent>
            <Box
                maxWidth={"720px"}
                margin={"auto"}
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                gap={"24px"}
            >
                <Heading>Mint 1000 Chips</Heading>
                <Box width={"100%"}>
                    <Text>Private Key: </Text>
                    <Input
                        required
                        onChange={(e) => {
                            setAddress(e.target.value);
                        }}
                        value={address}
                    />
                    {/* <Text>Amount: </Text>
                    <Input
                        type="number"
                        onChange={(e) => {
                            let isnum = /^\d+$/.test(e.target.value);
                            if (e.target.value.length === 0) setAmount("0");
                            else if (isnum) setAmount(e.target.value);
                            else setAmount(amount);
                        }}
                        value={amount}
                        width={"100%"}
                    /> */}
                </Box>
                <Button
                    isLoading={loading}
                    loadingText={loadingText}
                    onClick={() => {
                        onSubmit();
                        setLoading(!loading);
                    }}
                    disabled
                >
                    {loadingText}
                </Button>
            </Box>
        </MainComponent>
    );
}
