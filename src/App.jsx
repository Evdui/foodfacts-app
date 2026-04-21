import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import SavedPage from "./pages/SavedPage";
import "./App.css";

function App() {
  return (
    <div>
      <NavBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:barcode" element={<DetailPage />} />
        <Route path="/saved" element={<SavedPage />} />
      </Routes>
    </div>
  );
}

export default App;