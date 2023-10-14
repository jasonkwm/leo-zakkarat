import { Box, Input, Textarea, Text } from "@chakra-ui/react";
import { useMainDataContext } from "@/hooks/MainDataProvider";

export default function GameInputs() {
    const { playPrivateKey, setPlayPrivateKey, playAmount, setPlayAmount, playCreditsRecord, setPlayCreditsRecord } =
        useMainDataContext();

    return (
        <>
            <Box width={"45%"}>
                <Text>Private Key: </Text>
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
                    onChange={(e) => setPlayAmount(Number(e.target.value))}
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
