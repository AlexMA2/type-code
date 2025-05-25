import { toTimeString } from "@utils/formatters";
import { useTimer } from "@hooks/useTimer";
import { DiffEditor } from "@monaco-editor/react";
import { LanguageCode } from "@services/CodeService/Code.model";
import { useGetCode } from "@services/CodeService/CodeAPI";
import * as babelPlugin from "prettier/plugins/babel";
import * as estreePlugin from "prettier/plugins/estree";
import * as prettier from "prettier/standalone";
import { useEffect, useRef, useState } from "react";

export interface Stats {
    cps: number;
    time: string;
}

const Home = () => {
    const { data, loading, error } = useGetCode(LanguageCode.JavaScript);

    const [formmatedCode, setFormmatedCode] = useState<string>("");
    const [finished, setFinished] = useState<boolean>(false);
    const { time, isRunning, start, stop, reset } = useTimer(0, false);
    const [stats, setStats] = useState<Stats>({ cps: 0, time: "" });

    const formatCode = async (code: string) => {
        return await prettier.format(code, {
            parser: "babel",
            plugins: [babelPlugin, estreePlugin],
            tabWidth: 4,
            semi: true,
            singleQuote: true,
        });
    };

    const isRunningRef = useRef(isRunning);
    useEffect(() => {
        isRunningRef.current = isRunning;
    }, [isRunning]);

    useEffect(() => {
        async function format() {
            if (!data) return;
            const rdm = Math.floor(Math.random() * data.length);

            const result = await formatCode(data[rdm].snippet);
            setFormmatedCode(result);
        }
        format();
    }, [data]);

    useEffect(() => {
        if (!finished) return;

        console.log(
            "🚀 ~ useEffect ~ finished:",
            finished,
            Math.round(formmatedCode.length / time),
            toTimeString(time),
        );
        setStats({
            cps: Math.round(formmatedCode.length / time),
            time: toTimeString(time),
        });
    }, [finished]);

    const modifiedEditorRef = useRef<any>(null);

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
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (!data || data.length === 0) return <p>No code snippets found.</p>;

    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            {finished ? (
                <p className="text-2xl text-gray-400">
                    Finished in {stats.time} with {stats.cps} characters per
                    second!
                </p>
            ) : (
                <p className="text-2xl text-gray-400">{toTimeString(time)}</p>
            )}

            <DiffEditor
                height={"75vh"}
                original={formmatedCode}
                modified=""
                theme="vs-dark"
                options={{
                    formatOnPaste: true,
                    formatOnType: true,
                    cursorBlinking: "smooth",
                }}
                onMount={handleEditorDidMount}
            ></DiffEditor>

            {/* {<CodeSnippet snippet={data[1].snippet}></CodeSnippet>} */}
        </div>
    );
};

export default Home;
