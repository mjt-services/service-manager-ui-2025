import ReactDOM from "react-dom/client";
import { App } from "./App";
(() => {
  try {
    ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
  } catch (e) {
    console.error(e);
  }
})();
