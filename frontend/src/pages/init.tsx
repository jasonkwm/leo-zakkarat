import React from "react";
import { initCasino } from "./tools/initCasino";
import { Box, Button, Input, Text } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useMainDataContext } from "@/hooks/MainDataProvider";

export function getUuid(result: string): string {
  const regex = /uuid:\s*(\d+u\d+)\.private/;
  let match = result.match(regex);
  if (match) {
    return match[1];
  }
  return "";
}

export default function Init() {
  const [privateKey, setPrivateKey] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [output, setOutput] = React.useState("");
  const { tableList, setTableList, tableListFull, setTableListFull } =
    useMainDataContext();
  const toast = useToast();

  async function onSubmit() {
    setLoading(true);
    const result = (await initCasino(privateKey))?.toString();
    if (result) {
      setTableListFull([...tableListFull, result]);
      let uuid = getUuid(result);
      setTableList([...tableList, uuid]);
      toast({
        title: "Transaction Successful.",
        description: "Successfully mint 1000 casino chips.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Transaction Failed.",
        description: "Please try again.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
    setLoading(false);
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
          await onSubmit();
        }}
      >
        Submit
      </Button>
      <Text>Output: </Text>
      <Text>{output}</Text>
    </Box>
  );
}
