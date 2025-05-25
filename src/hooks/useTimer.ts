import { useState, useEffect } from "react";

export const useTimer = (initialState = 0, autoStart = false) => {
    const [time, setTime] = useState(initialState);
    const [isRunning, setIsRunning] = useState(autoStart);

    useEffect(() => {
        if (!isRunning) return; // Si está pausado, no hacer nada

        const intervalId = setInterval(() => {
            setTime((prev) => prev + 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [isRunning]); // Depende de `isRunning`

    const start = () => setIsRunning(true);
    const stop = () => setIsRunning(false);
    const reset = () => {
        setTime(0);
        setIsRunning(false);
    };

    return { time, isRunning, start, stop, reset };
};
