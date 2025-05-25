export enum LanguageCode {
    JavaScript = "javascript",
    TypeScript = "typescript",
    Python = "python",
    Java = "java",
    CSharp = "csharp",
    CPlusPlus = "cpp",
    Go = "go",
    Ruby = "ruby",
    PHP = "php",
    Swift = "swift",
    Kotlin = "kotlin",
}

export interface Code {
    snippet: string;
    wordsQuantity: number;
}
