import { LS_LAST_STATS, LS_STATS_HISTORY } from "@/utils/constants";
import { Icon } from "@chakra-ui/react";
import { differenceInSeconds, format, formatDate } from "date-fns";
import { useEffect, useState } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import { useTranslation } from "react-i18next";
import { FaRegKeyboard } from "react-icons/fa";
import { IoTrophyOutline } from "react-icons/io5";
import { MdAccessTime } from "react-icons/md";
import { useLocalStorage, useWindowSize } from "react-use";
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

export interface StatsProps {
    time: string;
    cps: number;
}

export interface Stat {
    cps: number;
    time: string;
    points: number;
    updatedAt: string;
}

export interface ChartData {
    name: string;
    value: number;
}

const Stats = () => {
    const [value] = useLocalStorage<Stat>(LS_LAST_STATS);
    const [history] = useLocalStorage<Stat[]>(LS_STATS_HISTORY);
    const [chartData, setChartData] = useState<ChartData[]>([]);

    const { t } = useTranslation();

    useEffect(() => {
        if (!history) return;
        setChartData(history2ChartData(history));
    }, [history]);

    const history2ChartData = (history: Stat[]): ChartData[] => {
        return history.map((stat) => ({
            name: format(new Date(stat.updatedAt), "MMMM, dd yyyy HH:mm:ss"),
            value: stat.cps,
        }));
    };

    const formatXAxis = (value: string) => {
        console.log("🚀 ~ formatXAxis ~ value:", value);
        if (!value) return "";
        const formatted = format(new Date(value), "yyyy-MM-dd");
        return formatted;
    };

    const { width, height } = useWindowSize();

    return (
        <main className="flex flex-row items-center justify-center w-full h-full p-4 box-border">
            {value ? (
                <div className="rounded-lg bg-white dark:bg-gray-800 min-h-min p-6 px-8">
                    {differenceInSeconds(
                        new Date(),
                        new Date(value.updatedAt),
                    ) <= 10 && (
                        <ConfettiExplosion
                            width={width}
                            height={height}
                            duration={3000}
                            force={0.7}
                        />
                    )}
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col items-center justify-center w-full min-w-60  gap-2">
                            <div className="flex flex-row items-center justify-center  gap-2">
                                <h1 className="text-slate-800 text-center dark:text-white ">
                                    {t("stats.last")}
                                </h1>
                            </div>
                            <span className="text-xl text-center text-primary-500">
                                {format(
                                    new Date(value.updatedAt),
                                    "MMMM dd, yyyy HH:mm:ss",
                                )}
                            </span>
                        </div>

                        <div className="flex flex-col items-center min-w-60  gap-2">
                            <div className="flex flex-row text-2xl  items-center justify-start mr-auto gap-2">
                                <Icon size="lg">
                                    <FaRegKeyboard />
                                </Icon>
                                <span className=" text-gray-400 ">
                                    {t("cps.label")}
                                </span>
                            </div>
                            <span className=" text-slate-700 text-center  text-7xl dark:text-primary-500 ">
                                {value.cps}
                            </span>
                        </div>

                        <div className="flex flex-col items-center min-w-60  gap-2">
                            <div className="flex flex-row text-2xl  items-center justify-start mr-auto gap-2">
                                <Icon size="lg">
                                    <MdAccessTime />
                                </Icon>
                                <span className=" text-gray-400 ">
                                    {t("time.label")}
                                </span>
                            </div>
                            <span className=" text-slate-700 text-left  text-7xl dark:text-primary-500 ">
                                {value.time}
                            </span>
                        </div>

                        <div className="flex flex-col items-center min-w-60 gap-2">
                            <div className="flex flex-row  text-2xl items-center justify-start mr-auto gap-2">
                                <Icon size="lg">
                                    <IoTrophyOutline />
                                </Icon>
                                <span className=" text-gray-400 ">
                                    {t("points.label")}
                                </span>
                            </div>
                            <span className=" text-slate-700 text-left  text-7xl dark:text-primary-500 ">
                                {value.points}
                            </span>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center gap-4"></div>
            )}

            <ResponsiveContainer width="80%" height="100%">
                <LineChart
                    width={500}
                    height={300}
                    data={chartData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tickFormatter={formatXAxis} />
                    <YAxis />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "#0a0a0a",
                        }}
                    />

                    <Line type="monotone" dataKey="value" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        </main>
    );
};

export default Stats;
