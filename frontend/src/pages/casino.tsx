import { useMainDataContext } from "@/hooks/MainDataProvider";
import {
  Box,
  Button,
  Center,
  Grid,
  GridItem,
  Heading,
  SimpleGrid,
} from "@chakra-ui/react";
import React from "react";

const casino = () => {
  const {} = useMainDataContext();

  return (
    <Box
      h={"100vh"}
      p={10}
      bg={"brand.zakkarat_background"}
      color={"brand.zakkarat_white"}
    >
      <Grid
        h={"100%"}
        templateRows={"repeat(9, 1fr)"}
        templateColumns={"repeat(2, 1fr)"}
        gap={10}
      >
        <GridItem
          rowSpan={2}
          colSpan={2}
          border={"3px solid"}
          borderColor={"brand.zakkarat_white"}
          borderRadius={"lg"}
        >
          <Center h={"100%"}>
            <Heading>Casino Owner</Heading>
          </Center>
        </GridItem>
        <GridItem
          rowSpan={2}
          colSpan={2}
          border={"3px solid"}
          borderColor={"brand.zakkarat_white"}
          borderRadius={"lg"}
        >
          <Center h={"100%"}>
            <Button>Play game</Button>
          </Center>
        </GridItem>
        <GridItem
          rowSpan={5}
          colSpan={1}
          border={"3px solid"}
          borderColor={"brand.zakkarat_white"}
          borderRadius={"lg"}
        ></GridItem>
        <GridItem
          rowSpan={5}
          colSpan={1}
          border={"3px solid"}
          borderColor={"brand.zakkarat_white"}
          borderRadius={"lg"}
        ></GridItem>
      </Grid>
    </Box>
  );
};

export default casino;
