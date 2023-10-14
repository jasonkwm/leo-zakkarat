import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { Box, Center, Container, Flex, Grid, GridItem, Spacer, Button } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import MainComponent from "@/components/MainComponent";
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
                    ></GridItem>
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
                        <Box bg={"papayawhip"} w={"100%"} p={5} borderRadius={"lg"} marginBottom={5}>
                            Table 1
                        </Box>
                        <Box bg={"papayawhip"} w={"100%"} p={5} borderRadius={"lg"} marginBottom={5}>
                            Table 1
                        </Box>
                        <Box bg={"papayawhip"} w={"100%"} p={5} borderRadius={"lg"} marginBottom={5}>
                            Table 1
                        </Box>
                        <Box bg={"papayawhip"} w={"100%"} p={5} borderRadius={"lg"} marginBottom={5}>
                            Table 1
                        </Box>
                        <Box bg={"papayawhip"} w={"100%"} p={5} borderRadius={"lg"} marginBottom={5}>
                            Table 1
                        </Box>
                        <Box bg={"papayawhip"} w={"100%"} p={5} borderRadius={"lg"} marginBottom={5}>
                            Table 1
                        </Box>
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
                    >
                        <BaccaratTable />
                    </GridItem>
                </Grid>
            </Box>
        </MainComponent>
    );
}

function BaccaratTable() {
    return (
        <>
            <Button
                position={"absolute"}
                top={"20%"}
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
                }}
            ></Button>
            {/* <Button></Button> */}
        </>
    );
}
