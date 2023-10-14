import React from "react";
import { Box, Heading, Text, Link } from "@chakra-ui/react";
export default function MainComponent({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Box
                display={"flex"}
                flexDirection={"row"}
                alignItems={"center"}
                justifyContent={"space-around"}
                position={"fixed"}
                top={"0"}
                backgroundColor={"white"}
                width={"100%"}
                padding={"10px 0px"}
            >
                <Link href="/" border={"solid 1px black"} borderRadius={"8px"} padding={"8px 24px"}>
                    Home
                </Link>
                <Link href="/mint" border={"solid 1px black"} borderRadius={"8px"} padding={"8px 24px"}>
                    Deposit
                </Link>
            </Box>
            <Box mt={"60px"}>{children}</Box>
        </>
    );
}
