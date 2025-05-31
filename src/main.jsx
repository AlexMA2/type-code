import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "@/components/ui/provider";
import App from "./App.jsx";
import "./assets/i18n/i18n";
createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Provider>
            <App />
        </Provider>
    </StrictMode>,
);
