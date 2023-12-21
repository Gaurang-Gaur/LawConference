import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import{SocketProvider} from "./context/SocketProvider";

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
		<SocketProvider>
		<App />
		</SocketProvider>
		
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById("root")
);
