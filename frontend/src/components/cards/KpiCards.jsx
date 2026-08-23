import { useEffect, useState } from "react";

import {
  Car,
  CloudSun,
  Droplets,
  Leaf,
  ShieldAlert,
  Zap,
} from "lucide-react";


const API_URL = "http://127.0.0.1:8000";


function KpiCards() {

  const [dashboard, setDashboard] = useState(null);
  const [weather, setWeather] = useState(null);
  const [airQuality, setAirQuality] = useState(null);
  const [water, setWater] = useState(null);
  const [energy, setEnergy] = useState(null);
  const [crime, setCrime] = useState(null);

  const [loading, setLoading] = useState(true);


  useEffect(() => {

    async function loadDashboardData() {

      try {

        const [
          dashboardResponse,
          weatherResponse,
          airQualityResponse,
          waterResponse,
          energyResponse,
          crimeResponse,
        ] = await Promise.all([

          fetch(`${API_URL}/summary`),

          fetch(`${API_URL}/weather/summary`),

          fetch(`${API_URL}/air-quality/summary`),

          fetch(`${API_URL}/water/summary`),

          fetch(`${API_URL}/energy/summary`),

          fetch(`${API_URL}/crime/summary`),

        ]);


        // Check for API errors
        if (
          !dashboardResponse.ok ||
          !weatherResponse.ok ||
          !airQualityResponse.ok ||
          !waterResponse.ok ||
          !energyResponse.ok ||
          !crimeResponse.ok
        ) {
          throw new Error("Failed to fetch dashboard data");
        }


        const dashboardData =
          await dashboardResponse.json();

        const weatherData =
          await weatherResponse.json();

        const airQualityData =
          await airQualityResponse.json();

        const waterData =
          await waterResponse.json();

        const energyData =
          await energyResponse.json();

        const crimeData =
          await crimeResponse.json();


        // Store API data
        setDashboard(dashboardData);
        setWeather(weatherData);
        setAirQuality(airQualityData);
        setWater(waterData);
        setEnergy(energyData);
        setCrime(crimeData);

      } catch (error) {

        console.error(
          "Dashboard API Error:",
          error
        );

      } finally {

        setLoading(false);

      }
    }


    loadDashboardData();

  }, []);


  // ============================================================
  // KPI CARDS
  // ============================================================

  const cards = [

    {
      title: "Traffic",

      value: dashboard
        ? Number(
            dashboard.total_vehicles
          ).toLocaleString()
        : "...",

      subtitle: "Vehicles",

      icon: <Car size={28} />,

      color: "text-cyan-400",
    },


    {
      title: "Weather",

      value: weather
        ? `${Number(
            weather.average_temperature
          ).toFixed(1)}°C`
        : "...",

      subtitle: weather
        ? `${Number(
            weather.average_humidity
          ).toFixed(1)}% Humidity`
        : "Loading...",

      icon: <CloudSun size={28} />,

      color: "text-yellow-400",
    },


    {
      title: "Air Quality",

      value: airQuality
        ? `AQI ${Math.round(
            airQuality.average_aqi
          )}`
        : "...",

      subtitle: "Average AQI",

      icon: <Leaf size={28} />,

      color: "text-green-400",
    },


    {
      title: "Water",

      value: water
        ? `${Number(
            water.average_water_level
          ).toFixed(1)}`
        : "...",

      subtitle: water
        ? `${water.leakage_count} Leakage Records`
        : "Loading...",

      icon: <Droplets size={28} />,

      color: "text-blue-400",
    },


    {
      title: "Energy",

      value: energy
        ? Number(
            energy.average_consumption
          ).toFixed(1)
        : "...",

      subtitle: energy
        ? `${energy.outage_count} Power Outages`
        : "Loading...",

      icon: <Zap size={28} />,

      color: "text-orange-400",
    },


    {
      title: "Crime",

      value: crime
        ? Number(
            crime.total_incidents
          ).toLocaleString()
        : "...",

      subtitle: crime
        ? `${crime.hotspot_count} Crime Hotspots`
        : "Loading...",

      icon: <ShieldAlert size={28} />,

      color: "text-red-400",
    },

  ];


  // ============================================================
  // UI
  // ============================================================

  return (

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">

      {cards.map((card) => (

        <div
          key={card.title}
          className="
            bg-slate-900
            border
            border-slate-800
            rounded-xl
            p-5
            hover:border-slate-700
            transition
          "
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-slate-400 text-sm">
                {card.title}
              </p>

              <h2 className="text-white text-3xl font-bold mt-2">

                {loading
                  ? "..."
                  : card.value}

              </h2>

              <p className="text-slate-500 text-sm mt-1">

                {loading
                  ? "Loading..."
                  : card.subtitle}

              </p>

            </div>


            <div className={card.color}>

              {card.icon}

            </div>

          </div>

        </div>

      ))}

    </div>

  );
}


export default KpiCards;