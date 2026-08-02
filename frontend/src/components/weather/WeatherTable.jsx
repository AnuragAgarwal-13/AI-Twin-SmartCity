function WeatherTable({ weatherData }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">

      <div className="overflow-x-auto">

        <table className="w-full text-sm">

          <thead className="bg-slate-800 text-slate-300">

            <tr>
              
              <th className="p-4 text-left">Weather</th>
              <th className="p-4 text-left">Temperature (°C)</th>
              <th className="p-4 text-left">Humidity (%)</th>
              <th className="p-4 text-left">Visibility (m)</th>
            </tr>

          </thead>

          <tbody>

            {weatherData.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center p-6 text-slate-400"
                >
                  No Weather Records Found
                </td>
              </tr>
            ) : (
              weatherData.map((record) => (
                <tr
                  key={record.Record_ID}
                  className="border-t border-slate-800 hover:bg-slate-800 transition"
                >
                  

                  <td className="p-4">

  <span
    className={`px-3 py-1 rounded-full text-xs font-semibold
      ${
        record.Weather === "Clear"
          ? "bg-green-500/20 text-green-400"

          : record.Weather === "Rain"
          ? "bg-blue-500/20 text-blue-400"

          : record.Weather === "Fog"
          ? "bg-gray-500/20 text-gray-300"

          : record.Weather === "Storm"
          ? "bg-red-500/20 text-red-400"

          : record.Weather === "Snow"
          ? "bg-cyan-500/20 text-cyan-300"

          : "bg-slate-700 text-white"
      }`}
  >
    {record.Weather}
  </span>

</td>

                  <td className="p-4 text-white">
                    {record.temperature} °C
                  </td>

                  <td className="p-4 text-white">
                    {record.humidity} %
                  </td>

                  <td className="p-4">

  <div className="flex flex-col">

    <span className="text-white">
      {record.Visibility} m
    </span>

    <span
      className={`text-xs font-semibold
      ${
        record.Visibility >= 5000
          ? "text-green-400"

          : record.Visibility >= 3000
          ? "text-yellow-400"

          : "text-red-400"
      }`}
    >
      {
        record.Visibility >= 5000
          ? "Excellent"

          : record.Visibility >= 3000
          ? "Moderate"

          : "Poor"
      }
    </span>

  </div>

</td>
                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default WeatherTable;