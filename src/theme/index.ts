import {
    createSystem,
    defaultBaseConfig,
    defaultSystem,
    defaultConfig,
    defineConfig,
} from "@chakra-ui/react";

const customConfig = defineConfig({
    preflight: false,
    theme: {
        tokens: {
            colors: {
                "brand.50": { value: "#f8fee7" },
                "brand.100": { value: "#effccb" },
                "brand.200": { value: "#dff99d" },
                "brand.300": { value: "#c7f264" },
                "brand.400": { value: "#a8e425" },
                "brand.500": { value: "#90cc16" },
                "brand.600": { value: "#6fa30d" },
                "brand.700": { value: "#547c0f" },
                "brand.800": { value: "#446212" },
                "brand.900": { value: "#3a5314" },
                "brand.950": { value: "#1d2e05" },
                "secondary.50": {
                    value: "#f6f7f8",
                },
                "secondary.100": {
                    value: "#ebecee",
                },
                "secondary.200": {
                    value: "#d9dcde",
                },
                "secondary.300": {
                    value: "#c4c9cc",
                },
                "secondary.400": {
                    value: "#a7aeb3",
                },
                "secondary.500": {
                    value: "#92999f",
                },
                "secondary.600": {
                    value: "#81878f",
                },
                "secondary.700": {
                    value: "#747981",
                },
                "secondary.800": {
                    value: "#61666c",
                },
                "secondary.900": {
                    value: "#505358",
                },
                "secondary.950": {
                    value: "#333538",
                },
            },
        },
    },
});

export const system = createSystem(defaultConfig, customConfig);
