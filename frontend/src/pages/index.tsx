import { Inter } from "next/font/google";
import { Box, Center, Grid, GridItem, Input, Textarea, Text, Button } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import MainComponent from "@/components/MainComponent";
import BaccaratTable from "@/components/BaccaratTable";
import TableList from "@/components/TableList";
import { useMainDataContext } from "@/hooks/MainDataProvider";
import React from "react";
import GameInputs from "@/components/GameInputs";
import GameSubmit from "@/components/GameSubmit";
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
                        <GameInputs />
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
                        <GameSubmit />
                    </GridItem>
                </Grid>
            </Box>
        </MainComponent>
    );
}
