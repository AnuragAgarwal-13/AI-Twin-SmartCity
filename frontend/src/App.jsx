import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Dashboard from "./pages/Dashboard/Dashboard";
import Traffic from "./pages/Traffic/Traffic";
import Weather from "./pages/Weather/Weather";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<MainLayout />}>

          <Route
            path="/"
            element={<Dashboard />}
          />

          <Route
            path="/traffic"
            element={<Traffic />}
          />

          <Route
            path="/weather"
            element={<Weather />}
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;