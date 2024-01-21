import { useLocation } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import "./css/index.css";
import { AnimatePresence } from "framer-motion";

function App() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <div className="App">
        <AppRoutes key={location.pathname} location={location} />
      </div>
    </AnimatePresence>
  );
}

export default App;
