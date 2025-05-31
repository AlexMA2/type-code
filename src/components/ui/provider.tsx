import { ColorModeProvider } from "@/components/ui/color-mode";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { system } from "theme";

export function Provider({ children }: any) {
    return (
        <ChakraProvider value={system}>
            <ColorModeProvider defaultTheme="dark" forcedTheme="dark">
                {children}{" "}
            </ColorModeProvider>
        </ChakraProvider>
    );
}
