/**
 * Calculates a score based on time taken and characters per second.
 * @param timeSeconds - The total time in seconds.
 * @param cps - Characters per second (speed).
 * @returns A numeric score.
 */
export const calculateScore = (timeSeconds: number, cps: number): number => {
    if (timeSeconds <= 0 || cps <= 0) return 0;

    // Example scoring formula: higher CPS and lower time yield better scores
    const efficiency = cps / (timeSeconds || 1);

    // Normalize to a score out of 1000 (you can adjust this formula)
    const score = Math.min(Math.round(efficiency * 1000), 1000);

    return score;
};

export const showConfetti = () => {
    if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("confetti"));
    }
};
