import { useState, useEffect } from "react";
import {
  
  filterWeather,
} from "../../services/weatherService";

function WeatherFilters({ setWeatherData }) {
  const [weather, setWeather] = useState("");
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");

  // Load Weather Records
  async function loadWeather() {
    try {
      // No filters -> show all records
      if (!weather && !temperature && !humidity) {
        const data = await filterWeather();
        setWeatherData(data);
        return;
      }

      // Apply Combined Filters
      const data = await filterWeather(
        weather,
        temperature,
        humidity
      );

      setWeatherData(data);
    } catch (error) {
      console.error(error);
    }
  }

  // Initial Load
  useEffect(() => {
    loadWeather();
  }, []);

  // Reload whenever filters change
  useEffect(() => {
    loadWeather();
  }, [weather, temperature, humidity]);

  // Reset Filters
  function resetFilters() {
    setWeather("");
    setTemperature("");
    setHumidity("");
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">

      <div className="grid md:grid-cols-4 gap-4">

        {/* Weather */}

        <select
          value={weather}
          onChange={(e) => setWeather(e.target.value)}
          className="bg-slate-800 rounded-lg p-3 text-white"
        >
          <option value="">All Weather</option>
          <option value="Clear">Clear</option>
          <option value="Fog">Fog</option>
          <option value="Rain">Rain</option>
          <option value="Storm">Storm</option>
          
        </select>

        {/* Temperature */}

        <select
          value={temperature}
          onChange={(e) => setTemperature(e.target.value)}
          className="bg-slate-800 rounded-lg p-3 text-white"
        >
          <option value="">All Temperature</option>
          
          <option value="11-20">11 - 20 °C</option>
          <option value="21-30">21 - 30 °C</option>
          <option value="31-40">31 - 40 °C</option>
          <option value="40+">40+ °C</option>
        </select>

        {/* Humidity */}

        <select
          value={humidity}
          onChange={(e) => setHumidity(e.target.value)}
          className="bg-slate-800 rounded-lg p-3 text-white"
        >
          <option value="">All Humidity</option>
          <option value="0-25">0 - 25 %</option>
          <option value="26-50">26 - 50 %</option>
          <option value="51-75">51 - 75 %</option>
          <option value="76-100">76 - 100 %</option>
        </select>

        {/* Reset */}

        <button
          onClick={resetFilters}
          className="bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition"
        >
          Reset Filters
        </button>

      </div>

    </div>
  );
}

export default WeatherFilters;[]