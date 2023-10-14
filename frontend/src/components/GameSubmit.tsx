import { Button } from "@chakra-ui/react";
import { useMainDataContext } from "@/hooks/MainDataProvider";

export default function GameSubmit() {
  const { playSubmitStatus, setPlaySubmitStatus, userChips } =
    useMainDataContext();

  const handleMakeBet = async () => {};

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
