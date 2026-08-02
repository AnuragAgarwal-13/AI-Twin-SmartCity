import { useEffect, useState } from "react";
import { CloudSun, Droplets, Eye } from "lucide-react";
import { getWeatherSummary } from "../../services/weatherService";

function WeatherSummary() {
  const [summary, setSummary] = useState({
    average_temperature: 0,
    average_humidity: 0,
    average_visibility: 0,
  });



useEffect(() => {
  const fetchSummary = async () => {
    try {
      const data = await getWeatherSummary();
      setSummary(data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchSummary();
}, []);

 
  const cards = [
    {
      title: "Average Temperature",
      value: `${summary.average_temperature} °C`,
      icon: <CloudSun size={28} />,
      color: "from-orange-500 to-red-500",
    },
    {
      title: "Average Humidity",
      value: `${summary.average_humidity} %`,
      icon: <Droplets size={28} />,
      color: "from-cyan-500 to-blue-500",
    },
    {
      title: "Average Visibility",
      value: `${summary.average_visibility.toFixed(2)} m`,
      icon: <Eye size={28} />,
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-sky-500 transition"
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-slate-400 text-sm">{card.title}</p>

              <h2 className="text-3xl font-bold text-white mt-2">
                {card.value}
              </h2>
            </div>

            <div
              className={`p-4 rounded-xl bg-gradient-to-r ${card.color} text-white`}
            >
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default WeatherSummary;