import React from "react";
import { initCasino } from "./tools/initCasino";
import { Box, Button, Input, Text } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

export default function Init() {
    const [privateKey, setPrivateKey] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [output, setOutput] = React.useState("");
    const toast = useToast();
    async function onSubmit() {
        setLoading(true);
        const result = (await initCasino(privateKey))?.toString();
        return result;
    }
    return (
        <Box
            width={"50%"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            margin={"48px auto"}
            gap={"24px"}
        >
            <Text>Input Private Key:</Text>
            <Input
                onChange={(e) => {
                    setPrivateKey(e.target.value);
                }}
                value={privateKey}
            />
            <Button
                isLoading={loading}
                onClick={async () => {
                    if (privateKey.length !== 59) {
                        toast({
                            title: "Wrong private key length.",
                            description: "Please try again.",
                            status: "info",
                            duration: 9000,
                            isClosable: true,
                        });
                        return;
                    }
                    setLoading(!loading);
                    let txn = await onSubmit();
                    if (txn) {
                        setOutput(txn);
                        toast({
                            title: "Transaction Successful.",
                            description: "Successfully mint 1000 casino chips.",
                            status: "success",
                            duration: 9000,
                            isClosable: true,
                        });
                    } else {
                        setOutput("");
                        toast({
                            title: "Transaction Failed.",
                            description: "Please try again.",
                            status: "success",
                            duration: 9000,
                            isClosable: true,
                        });
                    }
                    setLoading(!loading);
                }}
            >
                Submit
            </Button>
            <Text>Output: </Text>
            <Text>{output}</Text>
        </Box>
    );
}
