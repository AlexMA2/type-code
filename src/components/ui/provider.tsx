import { ColorModeProvider } from "@/components/ui/color-mode";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

export function Provider({ children }: any) {
    return (
        <ChakraProvider value={defaultSystem}>
            <ColorModeProvider defaultTheme="dark" forcedTheme="dark">
                {children}{" "}
            </ColorModeProvider>
            0
        </ChakraProvider>
    );
}
