import { Inter } from "next/font/google";
import { Box, Center, Grid, GridItem, Input, Textarea, Text, Button } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import MainComponent from "@/components/MainComponent";
import BaccaratTable from "@/components/BaccaratTable";
import TableList from "@/components/TableList";
import { useMainDataContext } from "@/hooks/MainDataProvider";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    return (
        <MainComponent>
            <Box h={"100vh"} p={10} bg={"brand.zakkarat_background"} color={"brand.zakkarat_white"}>
                <Grid h={"100%"} templateRows={"repeat(5, 1fr)"} templateColumns={"repeat(6, 1fr)"} gap={6}>
                    <GridItem rowSpan={1} colSpan={6}>
                        <Center h={"100%"}>
                            <Heading size={"4xl"} fontWeight={500}>
                                Zakkarat
                            </Heading>
                        </Center>
                    </GridItem>
                    <GridItem
                        rowSpan={1}
                        colSpan={6}
                        border={"3px solid"}
                        borderColor={"brand.zakkarat_white"}
                        borderRadius={"lg"}
                        display={"flex"}
                        justifyContent={"space-around"}
                        padding={"8px"}
                    >
                        <PlayTheGame />
                    </GridItem>
                    <GridItem
                        rowSpan={3}
                        colSpan={3}
                        border={"3px solid"}
                        borderColor={"brand.zakkarat_white"}
                        borderRadius={"lg"}
                        overflowY={"scroll"}
                        padding={5}
                        color={"brand.zakkarat_black"}
                    >
                        <TableList />
                    </GridItem>
                    <GridItem
                        rowSpan={3}
                        colSpan={3}
                        border={"3px solid"}
                        borderColor={"brand.zakkarat_white"}
                        borderRadius={"lg"}
                        backgroundImage={"/baccarat-table.jpg"}
                        backgroundPosition="center"
                        backgroundRepeat="no-repeat"
                        backgroundSize="cover"
                        position={"relative"}
                        minWidth={"900px"}
                        minHeight={"510px"}
                    >
                        <BaccaratTable />
                    </GridItem>
                    <GridItem rowSpan={1} colSpan={6}>
                        <Button width={"100%"} paddingY={"24px"}>
                            Submit
                        </Button>
                    </GridItem>
                </Grid>
            </Box>
        </MainComponent>
    );
}

function PlayTheGame() {
    const { playPrivateKey, setPlayPrivateKey, playAmount, setPlayAmount, playCreditsRecord, setPlayCreditsRecord } =
        useMainDataContext();

    return (
        <>
            <Box width={"45%"}>
                <Text>Private Address: </Text>
                <Input
                    required
                    onChange={(e) => {
                        setPlayPrivateKey(e.target.value);
                    }}
                    value={playPrivateKey}
                />
                <Text>Amount: </Text>
                <Input
                    type="number"
                    onChange={(e) => {
                        let isnum = /^\d+$/.test(e.target.value);
                        if (e.target.value.length === 0) setPlayAmount("0");
                        else if (isnum) setPlayAmount(e.target.value);
                        else setPlayAmount(playAmount);
                    }}
                    value={playAmount}
                    width={"100%"}
                />
            </Box>
            <Box width={"45%"}>
                <Text>Records: </Text>
                <Textarea
                    required
                    onChange={(e: any) => {
                        setPlayCreditsRecord(e.target.value);
                    }}
                    value={playCreditsRecord}
                    height={"75%"}
                />
            </Box>
        </>
    );
}
