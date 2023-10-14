import { Button } from "@chakra-ui/react";
import { useMainDataContext } from "@/hooks/MainDataProvider";

export default function GameSubmit() {
    const { playSubmitStatus, setPlaySubmitStatus } = useMainDataContext();
    return (
        <Button width={"100%"} paddingY={"24px"} onSubmit={() => setPlaySubmitStatus(!playSubmitStatus)}>
            Submit
        </Button>
    );
}
