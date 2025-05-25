// src/utils/beautify.ts

export type Language = "javascript" | "typescript" | "react" | "angular";

interface BeautifyOptions {
    indentSize?: number;
}

const defaultOptions: Required<BeautifyOptions> = {
    indentSize: 4,
};

export function beautifyCode(
    code: string,
    options?: BeautifyOptions
): string[] {
    const { indentSize } = { ...defaultOptions, ...options };

    const lines = addJumpsToCode(code, indentSize);

    return lines;
}

export function addJumpsToCode(code: string, indentSize: number): string[] {
    const lines: string[] = [];
    const indent = (level: number) => " ".repeat(level * indentSize);

    let level = 0;
    let buffer = "";

    let stringIsOpen = false;
    for (let i = 0; i < code.length; i++) {
        const char = code[i];
        if (char === "`" || char === '"' || char === "'") {
            stringIsOpen = !stringIsOpen;
            buffer += char;
            continue;
        }

        if (stringIsOpen) {
            buffer += char;
            continue;
        }

        const nextChar = code[i + 1];
        const previousChar = code[i - 1];

        if (
            char === "{" ||
            (char === ">" && previousChar !== "=") ||
            char === ";"
        ) {
            buffer += char;
            lines.push(indent(level) + buffer.trim());

            buffer = "";
            if (char !== ";") {
                level++;
            }
        } else if (char === "}" || char === "<") {
            if (buffer.trim()) lines.push(indent(level) + buffer.trim());
            if (char === "}") level = Math.max(level - 1, 0);
            if (char === "<") level = Math.max(level - 1, 0);
            buffer = char;
        } else {
            buffer += char;
        }

        // Push closing tags or braces
        if (
            (char === "}" || char === "<") &&
            (nextChar === "\n" ||
                nextChar === undefined ||
                nextChar.trim() === "")
        ) {
            lines.push(indent(level) + buffer.trim());
            buffer = "";
        }
    }

    if (buffer.trim()) {
        lines.push(indent(level) + buffer.trim());
    }

    return lines;
}
