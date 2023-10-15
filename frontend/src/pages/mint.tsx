import React from "react";
import { Box, Button, Heading, Input, Text } from "@chakra-ui/react";
import MainComponent from "@/components/MainComponent";
import { mint } from "./tools/mint";
import { useToast } from "@chakra-ui/react";
import { cookies } from "next/headers";
import { useMainDataContext } from "@/hooks/MainDataProvider";
// async function test () {
//     return "yes";
// }

export default function Mint() {
    // const [amount, setAmount] = React.useState("");
    const [success, setSuccess] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [address, setAddress] = React.useState("");
    const [loadingText, setLoadingText] = React.useState("Submit");
    const { mintTxn, setMintTxn } = useMainDataContext();
    const [submitTime, setSubmitTime] = React.useState(false);
    const toast = useToast();

    async function onSubmit() {
        const result = (await mint(address))?.toString();
        if (result) result.length > 0 ? setLoadingText("Success") : setLoadingText("Failed");

        return result;
    }

    React.useEffect(() => {
        if (!loading) return;
        let timer1 = setTimeout(() => {
            setSubmitTime(true);
        }, 1000);
        return () => {
            clearTimeout(timer1);
        };
    }, [loading]);

    React.useEffect(() => {
        if (!submitTime) return;

        let txn = Promise.resolve(onSubmit());
        txn.then((val) => setMintTxn(val));
        setSubmitTime(false);
        setLoading(false);
    }, [submitTime]);
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
                    onClick={async () => {
                        if (address.length !== 59) {
                            toast({
                                title: "Wrong private key length.",
                                description: "Please try again.",
                                status: "info",
                                duration: 9000,
                                isClosable: true,
                            });
                            return;
                        }
                        setLoadingText("Loading");
                        setLoading(true);
                        if (loadingText === "Success") {
                            toast({
                                title: "Transaction Successful.",
                                description: "Successfully mint 1000 casino chips.",
                                status: "success",
                                duration: 9000,
                                isClosable: true,
                            });
                        } else if (loadingText === "Failed") {
                            setMintTxn("");
                            toast({
                                title: "Transaction Failed.",
                                description: "Please try again.",
                                status: "success",
                                duration: 9000,
                                isClosable: true,
                            });
                        }
                    }}
                    disabled
                >
                    {loadingText}
                </Button>
                {mintTxn.length > 0 ? (
                    <>
                        <Text>Please Copy ur transaction code: </Text>
                        <Text>{mintTxn}</Text>
                    </>
                ) : (
                    <></>
                )}
            </Box>
        </MainComponent>
    );
}
