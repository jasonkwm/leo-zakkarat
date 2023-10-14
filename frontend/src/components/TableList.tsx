import { useMainDataContext } from "@/hooks/MainDataProvider";
import { Heading, Button } from "@chakra-ui/react";

export default function TableList() {
    const { tableList, setSelectedTable, selectedTable } = useMainDataContext();
    return (
        <>
            <Heading
                backgroundColor={"white"}
                marginBottom={"12px"}
                textAlign={"center"}
                borderRadius={"4px"}
                paddingY={"12px"}
            >
                Select Your Table Number: {selectedTable}
            </Heading>
            {tableList.map((item, i) => {
                return (
                    <Button
                        key={i}
                        width={"100%"}
                        p={12}
                        borderRadius={"lg"}
                        marginBottom={5}
                        bg={"papayawhip"}
                        textAlign={"left"}
                        onClick={() => setSelectedTable(item)}
                    >
                        {item}
                    </Button>
                );
            })}
        </>
    );
}
