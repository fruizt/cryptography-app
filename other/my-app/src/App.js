import {  Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Shift from "./pages/Shift";

function App() {
  return (

      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/classic" element={<Home />} />
          <Route path="/shift" element={<Shift />} />
      </Routes>

  );
}

export default App;
