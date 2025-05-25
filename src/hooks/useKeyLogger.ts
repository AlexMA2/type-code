import { useState, useEffect } from "react";

const AUXILIAR_KEYS = [
    "Backspace",
    "Delete",
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
    "ArrowDown",
    "Enter",
    "Tab",
    "Escape",
    "Shift",
    "CapsLock",
    "Control",
    "Meta",
    "Alt",
    "AltGraph",
    "F1",
    "F2",
    "F3",
    "F4",
    "F5",
    "F6",
    "F7",
    "F8",
    "F9",
    "F10",
    "F11",
    "F12",
    "Insert",
    "ScrollLock",
    "Pause",
    "NumLock",
];

export const useKeyLogger = (onFirstTimeKeyPress: () => void) => {
    const [keysPressed, setKeysPressed] = useState<string[]>([]);
    const [firstTime, setFirstTime] = useState(true);
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (AUXILIAR_KEYS.includes(event.key)) return;

            console.log("🚀 ~ handleKeyDown ~ event.key:", event.key);
            setKeysPressed((prev) => [...prev, event.key]);
            if (firstTime) {
                setFirstTime(false);
                onFirstTimeKeyPress?.();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onFirstTimeKeyPress]);
    return keysPressed;
};
