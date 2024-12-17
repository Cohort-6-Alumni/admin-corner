import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter as Router } from "react-router";
import AppContextProvider from "./context/applicationContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AppContextProvider>
    <Router>
      <App />
    </Router>
  </AppContextProvider>
);
