type ColorShades = Record<string, string>;

export function transformColors(
    name: string,
    shades: ColorShades,
): Record<string, { value: string }> {
    const result: Record<string, { value: string }> = {};
    for (const [shade, hex] of Object.entries(shades)) {
        result[`${name}.${shade}`] = { value: hex };
    }
    return result;
}
