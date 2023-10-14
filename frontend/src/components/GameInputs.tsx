import { Box, Input, Textarea, Text } from "@chakra-ui/react";
import { useMainDataContext } from "@/hooks/MainDataProvider";

export default function GameInputs() {
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
