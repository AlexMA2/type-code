import { createContext } from "react";

export interface CodeContextValue {
    code: string;
    setCode: any;
    finished: boolean;
    setFinished: any;
    time: number;
    setTime: any;
}

export const CodeContext = createContext<CodeContextValue>({
    code: "",
    setCode: null,
    finished: false,
    setFinished: null,
    time: 0,
    setTime: null,
});
