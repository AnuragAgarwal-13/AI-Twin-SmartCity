import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard/Dashboard";
import Traffic from "./pages/Traffic/Traffic";
import Weather from "./pages/Weather/Weather";
import AQI from "./pages/AQI/AQI";
import Water from "./pages/Water/Water";
import Energy from "./pages/Energy/Energy";
import Crime from "./pages/Crime/Crime";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<MainLayout />}>

          <Route path="/" element={<Dashboard />} />

          <Route path="/traffic" element={<Traffic />} />

          <Route path="/weather" element={<Weather />} />

          <Route path="/aqi" element={<AQI />} />

          <Route path="/water" element={<Water />} />

          <Route path="/energy" element={<Energy />} />

          <Route path="/crime" element={<Crime />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;