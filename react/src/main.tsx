import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Cabbage } from "cabbage-react";

// Send message to Cabbage to indicate that the UI is ready to load
Cabbage.sendCustomCommand("cabbageIsReadyToLoad");

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>
);
