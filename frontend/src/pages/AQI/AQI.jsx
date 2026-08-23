import { useEffect, useState } from "react";
import {
  Leaf,
  Wind,
  Activity,
  AlertTriangle,
} from "lucide-react";

import {
  getAirQualitySummary,
  getAQICategories,
} from "../../services/airQualityService";

function AQI() {
  const [data, setData] = useState(null);
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadAQIData() {
      try {
        setLoading(true);

        const [summaryData, categoryData] =
          await Promise.all([
            getAirQualitySummary(),
            getAQICategories(),
          ]);

        setData(summaryData);
        setCategories(categoryData);
      } catch (err) {
        console.error("AQI API Error:", err);
        setError("Unable to load air quality data.");
      } finally {
        setLoading(false);
      }
    }

    loadAQIData();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-white">
        Loading air quality data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6">

      {/* PAGE HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">
          Air Quality
        </h1>

        <p className="text-slate-400 mt-1">
          Bengaluru air quality monitoring
        </p>
      </div>


      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">

        {/* AQI */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">

          <div className="flex justify-between items-center">

            <div>
              <p className="text-slate-400 text-sm">
                Average AQI
              </p>

              <h2 className="text-3xl font-bold text-white mt-2">
                {Number(data?.average_aqi ?? 0).toFixed(0)}
              </h2>

              <p className="text-slate-500 text-sm mt-1">
                Air Quality Index
              </p>
            </div>

            <Leaf
              size={30}
              className="text-green-400"
            />

          </div>

        </div>


        {/* PM2.5 */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">

          <div className="flex justify-between items-center">

            <div>
              <p className="text-slate-400 text-sm">
                Average PM2.5
              </p>

              <h2 className="text-3xl font-bold text-white mt-2">
                {Number(data?.average_pm25 ?? 0).toFixed(2)}
              </h2>

              <p className="text-slate-500 text-sm mt-1">
                µg/m³
              </p>
            </div>

            <Wind
              size={30}
              className="text-cyan-400"
            />

          </div>

        </div>


        {/* PM10 */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">

          <div className="flex justify-between items-center">

            <div>
              <p className="text-slate-400 text-sm">
                Average PM10
              </p>

              <h2 className="text-3xl font-bold text-white mt-2">
                {Number(data?.average_pm10 ?? 0).toFixed(2)}
              </h2>

              <p className="text-slate-500 text-sm mt-1">
                µg/m³
              </p>
            </div>

            <Activity
              size={30}
              className="text-yellow-400"
            />

          </div>

        </div>

      </div>


      {/* AQI CATEGORY SECTION */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">

        <div className="flex items-center gap-3 mb-5">

          <AlertTriangle
            size={22}
            className="text-orange-400"
          />

          <div>
            <h2 className="text-xl font-semibold text-white">
              AQI Categories
            </h2>

            <p className="text-slate-500 text-sm">
              Distribution of air quality records
            </p>
          </div>

        </div>


        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          {Object.entries(categories).map(
            ([category, count]) => (

              <div
                key={category}
                className="bg-slate-800/60 rounded-lg p-4"
              >

                <p className="text-slate-400 text-sm">
                  {category}
                </p>

                <p className="text-white text-2xl font-bold mt-2">
                  {Number(count).toLocaleString()}
                </p>

                <p className="text-slate-500 text-xs mt-1">
                  Records
                </p>

              </div>

            )
          )}

        </div>

      </div>

    </div>
  );
}

export default AQI;