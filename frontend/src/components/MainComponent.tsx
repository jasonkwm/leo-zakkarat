import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";

const pages = [
    { link: "/", name: "Home" },
    { link: "/mint", name: "Mint" },
    { link: "/init", name: "Init" },
    { link: "/casino", name: "Casino" },
];
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
                {pages.map((value, i) => (
                    <Link
                        key={i}
                        href={value.link}
                        style={{
                            border: "solid 1px black",
                            borderRadius: "8px",
                            padding: "8px 24px",
                        }}
                    >
                        {value.name}
                    </Link>
                ))}
            </Box>
            <Box mt={"60px"}>{children}</Box>
        </>
    );
}
