import { useState } from "react";

import WeatherSummary from "../../components/weather/WeatherSummary";
import WeatherFilters from "../../components/weather/WeatherFilters";
import WeatherTable from "../../components/weather/WeatherTable";

function Weather() {

  // Stores weather records
  const [weatherData, setWeatherData] = useState([]);

  return (
    <div className="space-y-8">

      {/* Header */}

      <div>

        <h1 className="text-4xl font-bold text-white">
          Weather Monitoring
        </h1>

        <p className="text-slate-400 mt-2">
          Live Weather Monitoring & Analytics
        </p>

      </div>

      {/* Summary */}

      <WeatherSummary />

      {/* Filters */}

      <WeatherFilters
        setWeatherData={setWeatherData}
      />

      {/* Table */}

      <div className="flex justify-between items-center">

    <h2 className="text-2xl font-bold text-white">
        Weather Records
    </h2>

    <p className="text-slate-400">
        Showing
        <span className="text-sky-400 font-semibold">
            {" "}{weatherData.length}{" "}
        </span>
        Records
    </p>

</div>

<WeatherTable
    weatherData={weatherData}
/>

    </div>
  );
}

export default Weather;