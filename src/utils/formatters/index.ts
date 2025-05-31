export function toTimeString(seconds: number): string {
    if (seconds === 0) return "0:00";

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const config = {
        hours: hours > 0 ? `${hours.toString().padStart(2, "0")}:` : "",
        minutes: minutes > 0 ? `${minutes.toString().padStart(2, "0")}:` : "0:",
        seconds:
            remainingSeconds > 0
                ? `${remainingSeconds.toString().padStart(2, "0")}`
                : "",
    };

    return `${config.hours}${config.minutes}${config.seconds}`;
}
