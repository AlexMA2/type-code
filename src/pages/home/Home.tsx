import { LanguageCode } from "@/services/CodeService/Code.model";
import { useGetCode } from "@/services/CodeService/CodeAPI";
import { LS_LAST_STATS, LS_STATS_HISTORY } from "@/utils/constants";
import { toTimeString } from "@/utils/formatters";
import { CodeContext } from "context/CodeContext";
import { useContext, useEffect, useState } from "react";
import { useLocalStorage } from "react-use";
import { useLocation } from "wouter";

import CodeSnippet from "./components/Code";
import { calculateScore } from "@/utils/stats";
import { Stat } from "pages/stats/Stats";
import { format } from "date-fns";

const Home = () => {
    const { data, loading, error } = useGetCode(LanguageCode.JavaScript);
    const [, setValue] = useLocalStorage<Stat>(LS_LAST_STATS);
    const [history, setHistory] = useLocalStorage<Stat[]>(LS_STATS_HISTORY);
    const [rdm, setRdm] = useState(0);
    const { code, finished, time } = useContext(CodeContext);
    const [, setLocation] = useLocation();

    useEffect(() => {
        if (!data) return;
        setRdm(Math.floor(Math.random() * data.length));
    }, [data]);

    useEffect(() => {
        if (!finished) return;

        const cps = parseFloat((code.length / (time || 1)).toFixed(2));
        const timeString = toTimeString(time);
        const lastStat = {
            cps: cps,
            time: timeString,
            points: calculateScore(time, cps),
            updatedAt: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
        };
        setValue(lastStat);

        setHistory([...(history ?? []), lastStat]);

        setLocation("/stats");
    }, [finished]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (!data || data.length === 0) return <p>No code snippets found.</p>;

    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <CodeSnippet snippet={data[rdm].snippet}></CodeSnippet>
        </div>
    );
};

export default Home;
