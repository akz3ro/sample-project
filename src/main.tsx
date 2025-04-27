import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import { Toaster } from "sonner";
import App from "./App";
import "./index.css";
import { store } from "./lib/store";

const root = document.getElementById("root");
if (!root) throw new Error("Root element not found");

createRoot(root).render(
	<StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<App />
				<Toaster />
			</BrowserRouter>
		</Provider>
	</StrictMode>,
);
