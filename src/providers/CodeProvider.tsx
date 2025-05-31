import { useState } from "react";
import { CodeContext } from "../context/CodeContext";

export const CodeProvider = ({ children }: any) => {
    const [code, setCode] = useState("");
    const [finished, setFinished] = useState(false);
    const [time, setTime] = useState(0);

    return (
        <CodeContext.Provider
            value={{ code, setCode, finished, setFinished, time, setTime }}
        >
            {children}
        </CodeContext.Provider>
    );
};
