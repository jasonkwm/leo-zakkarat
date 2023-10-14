import { useMainDataContext } from "@/hooks/MainDataProvider";
import {
  Box,
  Button,
  Center,
  Container,
  Grid,
  GridItem,
  Heading,
  SimpleGrid,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { playGame } from "./tools/playGame";

const casino = () => {
  const { tableListFull, bets } = useMainDataContext();

  const [playGameOutput, setPlayGameOutput] = useState("");

  const onPlayGame = async () => {
    console.log(tableListFull[0].toString());
    console.log(bets[0]);

    const playGame_Output = (
      await playGame(tableListFull[0], bets[0])
    ).toString();
    setPlayGameOutput(playGame_Output);
  };

  return (
    <Grid
      h={"100vh"}
      maxW={"100vw"}
      templateRows={"repeat(9, 1fr)"}
      templateColumns={"repeat(2, 1fr)"}
      gap={10}
      p={10}
      bg={"brand.zakkarat_background"}
      color={"brand.zakkarat_white"}
    >
      <GridItem
        rowSpan={2}
        colSpan={2}
        border={"3px solid"}
        borderColor={"brand.zakkarat_white"}
        borderRadius={"lg"}
        w={"100%"}
      >
        <Center h={"100%"}>
          <Heading>Casino Owner</Heading>
        </Center>
      </GridItem>
      <GridItem
        rowSpan={3}
        colSpan={1}
        border={"3px solid"}
        borderColor={"brand.zakkarat_white"}
        borderRadius={"lg"}
      >
        <Center h={"100%"}>
          <Button onClick={() => onPlayGame()}>Play game</Button>
        </Center>
      </GridItem>
      <GridItem
        rowSpan={3}
        colSpan={1}
        border={"3px solid"}
        borderColor={"brand.zakkarat_white"}
        borderRadius={"lg"}
      >
        <Center h={"100%"}>
          <Container>{playGameOutput}</Container>
        </Center>
      </GridItem>
      <GridItem
        rowSpan={4}
        colSpan={1}
        border={"3px solid"}
        borderColor={"brand.zakkarat_white"}
        borderRadius={"lg"}
      >
        {tableListFull.map((v, i) => (
          <Box key={i} p={5}>
            <Container>{v}</Container>
          </Box>
        ))}
      </GridItem>
      <GridItem
        rowSpan={4}
        colSpan={1}
        border={"3px solid"}
        borderColor={"brand.zakkarat_white"}
        borderRadius={"lg"}
      >
        {bets.map((v, i) => (
          <Box key={i} p={5}>
            <Container>{v}</Container>
          </Box>
        ))}
      </GridItem>
    </Grid>
  );
};

export default casino;
