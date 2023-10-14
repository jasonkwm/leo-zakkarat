import React from "react";
import { Box, Button, Heading, Input, Text } from "@chakra-ui/react";
import MainComponent from "@/components/MainComponent";

export default function Mint() {
    const [amount, setAmount] = React.useState("");
    const [success, setSuccess] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [address, setAddress] = React.useState("");
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
                <Heading>Mint Chips</Heading>
                <Box width={"100%"}>
                    <Text>Public Address: </Text>
                    <Input
                        required
                        onChange={(e) => {
                            setAddress(e.target.value);
                        }}
                        value={address}
                    />
                    <Text>Amount: </Text>
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
                    />
                </Box>
                <Button
                    isLoading={loading}
                    loadingText="Submitting"
                    onClick={() => {
                        setLoading(!loading);
                    }}
                >
                    Submit
                </Button>
            </Box>
        </MainComponent>
    );
}
