import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Cabbage } from "cabbage-react";

if (import.meta.env.PROD) {
	// Notify Cabbage that the UI is ready to receive data
	Cabbage.sendCustomCommand("cabbageIsReadyToLoad");
}

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>
);
