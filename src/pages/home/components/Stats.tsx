import { Icon } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaRegKeyboard } from "react-icons/fa";
import { IoTrophyOutline } from "react-icons/io5";
import { MdAccessTime } from "react-icons/md";

export interface StatsProps {
    time: string;
    cps: number;
}

const Stats = ({ time, cps }: StatsProps) => {
    const [points, setPoints] = useState(0);

    useEffect(() => {
        const score = calculateScore(Number(time), cps);
        setPoints(score);
    }, [time, cps]);

    /**
     * Calculates a score based on time taken and characters per second.
     * @param timeSeconds - The total time in seconds.
     * @param cps - Characters per second (speed).
     * @returns A numeric score.
     */
    const calculateScore = (timeSeconds: number, cps: number): number => {
        if (timeSeconds <= 0 || cps <= 0) return 0;

        // Example scoring formula: higher CPS and lower time yield better scores
        const efficiency = cps / (timeSeconds || 1);

        // Normalize to a score out of 1000 (you can adjust this formula)
        const score = Math.min(Math.round(efficiency * 1000), 1000);

        return score;
    };

    const { t } = useTranslation();

    return (
        <div className="rounded-lg bg-white dark:bg-gray-800 p-6">
            {" "}
            <div className="flex flex-col text-2xl gap-4">
                <div className="flex flex-row items-center justify-start gap-2">
                    <Icon size="lg">
                        <FaRegKeyboard />
                    </Icon>
                    <span className=" text-gray-400 ">{t("cps.label")}:</span>
                    <span className=" text-slate-700 dark:text-slate-100 ">
                        {cps}
                    </span>
                </div>

                <div className="flex flex-row items-center justify-start gap-2">
                    <Icon size="lg">
                        <MdAccessTime />
                    </Icon>
                    <span className=" text-gray-400 ">{t("time.label")}:</span>
                    <span className=" text-slate-700 dark:text-slate-100 ">
                        {time}
                    </span>
                </div>

                <div className="flex flex-row items-center justify-start gap-2">
                    <Icon size="lg">
                        <IoTrophyOutline />
                    </Icon>
                    <span className=" text-gray-400 ">
                        {t("points.label")}:
                    </span>
                    <span className=" text-slate-700 dark:text-slate-100 ">
                        {points}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Stats;
