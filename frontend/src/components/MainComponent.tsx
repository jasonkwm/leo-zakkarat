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
                padding={"24px"}
            >
                <Link href="/" border={"solid 1px black"} borderRadius={"8px"} padding={"8px 24px"}>
                    Home
                </Link>
                <Link href="/deposit" border={"solid 1px black"} borderRadius={"8px"} padding={"8px 24px"}>
                    Deposit
                </Link>
            </Box>
            {children}
        </>
    );
}
