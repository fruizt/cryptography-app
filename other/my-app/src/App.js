import {  Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Shift from "./pages/Shift";
import Hill from "./pages/Hill";
import Substitution from "./pages/Substitution";

function App() {
  return (

      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/classic" element={<Home />} />
          <Route path="/shift" element={<Shift />} />
          <Route path="/hill" element={<Hill />} />
          <Route path="/substitution" element={<Substitution />} />
      </Routes>

  );
}

export default App;
