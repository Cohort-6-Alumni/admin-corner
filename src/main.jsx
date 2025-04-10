import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppContextProvider from "./context/applicationContext";
import { CookiesProvider } from "react-cookie";

ReactDOM.createRoot(document.getElementById("root")).render(
  <CookiesProvider>
    <AppContextProvider>
      <Router>
        <App />
      </Router>
    </AppContextProvider>
  </CookiesProvider>
);
