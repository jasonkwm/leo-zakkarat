import { Button } from "@chakra-ui/react";
import { useMainDataContext } from "@/hooks/MainDataProvider";
import { makeBet } from "@/pages/tools/makeBet";
import { useToast } from "@chakra-ui/react";

export default function GameSubmit() {
    const toast = useToast();
    const {
        playSubmitStatus,
        setPlaySubmitStatus,
        playCreditsRecord,
        betOn,
        playAmount,
        playPrivateKey,
        selectedTable,
        setBets,
        bets,
    } = useMainDataContext();

    const handleMakeBet = async () => {
        console.log({ playCreditsRecord });
        console.log({ betOn });
        console.log({ playAmount });
        console.log({ playPrivateKey });
        console.log({ selectedTable });

        const tx_output = (
            await makeBet(playCreditsRecord, betOn, playAmount, playPrivateKey, Number(selectedTable))
        ).toString();
        if (tx_output) {
            toast({
                title: "Transaction Successful.",
                description: tx_output,
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
        console.log({ tx_output });

        const bet = tx_output.split(",")[1];
        setBets([...bets, bet]);
    };

    return (
        <Button
            width={"100%"}
            paddingY={"24px"}
            isLoading={playSubmitStatus}
            loadingText="Submitting"
            onClick={() => handleMakeBet()}
        >
            Submit
        </Button>
    );
}
