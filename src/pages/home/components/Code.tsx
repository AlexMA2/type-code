import { useTimer } from "@/hooks/useTimer";
import { toTimeString } from "@/utils/formatters";
import { DiffEditor } from "@monaco-editor/react";
import { useContext, useEffect, useRef, useState } from "react";
import * as babelPlugin from "prettier/plugins/babel";
import * as estreePlugin from "prettier/plugins/estree";
import * as prettier from "prettier/standalone";
import { CodeContext } from "context/CodeContext";
export interface CodeProps {
    snippet: string;
}

const CodeSnippet = (props: CodeProps) => {
    const { time, isRunning, start, stop, reset } = useTimer(0, false);
    const [formmatedCode, setFormmatedCode] = useState<string>("");
    const { setCode, setFinished, setTime } = useContext(CodeContext);

    useEffect(() => {
        async function format() {
            const result = await formatCode(props.snippet);
            setFormmatedCode(result);
            setCode(result);
        }
        format();
    }, [props.snippet]);

    useEffect(() => {
        setTime(time);
    }, [time]);

    const formatCode = async (code: string) => {
        return await prettier.format(code, {
            parser: "babel",
            plugins: [babelPlugin, estreePlugin],
            tabWidth: 4,
            semi: true,
            singleQuote: true,
        });
    };

    const modifiedEditorRef = useRef<any>(null);
    const isRunningRef = useRef(isRunning);
    useEffect(() => {
        isRunningRef.current = isRunning;
    }, [isRunning]);

    function handleEditorDidMount(editor: any) {
        modifiedEditorRef.current = editor;

        // Obtenemos el editor de la derecha (modificado)
        const originalEditor = editor.getOriginalEditor();
        const modifiedEditor = editor.getModifiedEditor();

        // Escuchamos los cambios del modelo
        modifiedEditor.onDidChangeModelContent(() => {
            const value: string = modifiedEditor.getValue();

            if (value.length > 0 && isRunningRef.current === false) {
                start();
                return;
            }

            if (
                value.replace(/\r/g, "") ===
                originalEditor.getValue().replace(/\r/g, "")
            ) {
                stop();
                setFinished(true);
            }
        });
    }
    return (
        <div className="w-full h-full">
            <h3 className="!my-4">{toTimeString(time)}</h3>

            <DiffEditor
                original={formmatedCode}
                modified=""
                theme="vs-dark"
                options={{
                    formatOnPaste: true,
                    formatOnType: true,
                    cursorBlinking: "smooth",
                    automaticLayout: true,
                }}
                onMount={handleEditorDidMount}
                height="100%"
                width="100%"
            ></DiffEditor>
        </div>
    );
};

export default CodeSnippet;
