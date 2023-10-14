import { Button } from "@chakra-ui/react";
import { useMainDataContext } from "@/hooks/MainDataProvider";
import { makeBet } from "@/pages/tools/makeBet";

export default function GameSubmit() {
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
      await makeBet(
        playCreditsRecord,
        betOn,
        playAmount,
        playPrivateKey,
        Number(selectedTable)
      )
    ).toString();

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
