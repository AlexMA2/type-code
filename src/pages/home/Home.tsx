import { LanguageCode } from "@/services/CodeService/Code.model";
import { useGetCode } from "@/services/CodeService/CodeAPI";
import { toTimeString } from "@/utils/formatters";
import { CodeContext } from "context/CodeContext";
import { useContext, useEffect, useRef, useState } from "react";
import CodeSnippet from "./components/Code";

export interface Stats {
    cps: number;
    time: string;
}

const Home = () => {
    const { data, loading, error } = useGetCode(LanguageCode.JavaScript);

    const [stats, setStats] = useState<Stats>({ cps: 0, time: "" });
    const [rdm, setRdm] = useState(0);
    const { code, finished, time } = useContext(CodeContext);

    useEffect(() => {
        if (!data) return;
        setRdm(Math.floor(Math.random() * data.length));
    }, [data]);

    useEffect(() => {
        if (!finished) return;

        setStats({
            cps: Math.round(code.length / (time || 1)),
            time: toTimeString(time),
        });
    }, [finished]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (!data || data.length === 0) return <p>No code snippets found.</p>;

    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            {finished ? (
                <p className=" text-gray-400">
                    Finished in {stats.time} with {stats.cps} characters per
                    second!
                </p>
            ) : (
                <CodeSnippet snippet={data[rdm].snippet}></CodeSnippet>
            )}
        </div>
    );
};

export default Home;
