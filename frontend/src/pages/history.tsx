import React from "react";
import { Box, Text, Heading, Input, Button } from "@chakra-ui/react";
import MainComponent from "@/components/MainComponent";
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer } from "@chakra-ui/react";
import { useMainDataContext } from "@/hooks/MainDataProvider";

const successColor = "#5cb85c4D";
const errorColor = "#ED43374D";

export default function History() {
    const [viewKey, setViewKey] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [displayText, setDisplayText] = React.useState(false);
    React.useEffect(() => {
        if (!loading) return;
        let timer1 = setTimeout(() => {
            setLoading(false);
            setDisplayText(true);
        }, 2000);
        return () => {
            clearTimeout(timer1);
        };
    }, [loading]);
    return (
        <MainComponent>
            <Box
                maxWidth={"720px"}
                margin={"auto"}
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                gap={"48px"}
            >
                <Heading as={"h2"}>Game History</Heading>
                <Box width={"100%"}>
                    <Text>View Key: </Text>
                    <Input
                        required
                        onChange={(e) => {
                            setViewKey(e.target.value);
                        }}
                        value={viewKey}
                    />
                    <Button
                        isLoading={loading}
                        onClick={() => {
                            if (viewKey.length === 53) {
                                setLoading(true);
                            }
                        }}
                        width={"100%"}
                    >
                        Submit
                    </Button>
                </Box>
                <Text>Results: </Text>
            </Box>
            {displayText ? <ResultTable /> : <></>}
        </MainComponent>
    );
}

function ResultTable() {
    return (
        <TableContainer width={"45%"} margin={"24px auto"}>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>Table Number</Th>
                        <Th>Bet on</Th>
                        <Th>Amount Bet</Th>
                        <Th>Amount Won</Th>
                        <Th>Outcome</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr backgroundColor={successColor}>
                        <Td>123</Td>
                        <Td>Banker</Td>
                        <Td>300</Td>
                        <Td>600</Td>
                        <Td>Won</Td>
                    </Tr>
                    <Tr backgroundColor={errorColor}>
                        <Td>682</Td>
                        <Td>Player</Td>
                        <Td>300</Td>
                        <Td>0</Td>
                        <Td>Loss</Td>
                    </Tr>
                    <Tr backgroundColor={errorColor}>
                        <Td>2271</Td>
                        <Td>Player</Td>
                        <Td>300</Td>
                        <Td>0</Td>
                        <Td>Loss</Td>
                    </Tr>
                </Tbody>
            </Table>
        </TableContainer>
    );
}
