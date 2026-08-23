import { useEffect, useState } from "react";

import {
  Zap,
  Leaf,
  Gauge,
  AlertTriangle,
  Activity,
  Database,
} from "lucide-react";

import {
  getEnergySummary,
  getEnergySources,
  getEnergyOutages,
} from "../../services/energyService";

function Energy() {
  const [summary, setSummary] = useState(null);
  const [sources, setSources] = useState({});
  const [outages, setOutages] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ============================================================
  // LOAD ENERGY DATA
  // ============================================================

  useEffect(() => {
    async function loadEnergyData() {
      try {
        setLoading(true);
        setError("");

        const [summaryData, sourceData, outageData] =
          await Promise.all([
            getEnergySummary(),
            getEnergySources(),
            getEnergyOutages(),
          ]);

        console.log("Energy Summary:", summaryData);
        console.log("Energy Sources:", sourceData);
        console.log("Energy Outages:", outageData);

        setSummary(summaryData);
        setSources(sourceData || {});
        setOutages(
          Array.isArray(outageData)
            ? outageData
            : []
        );
      } catch (err) {
        console.error("Energy API Error:", err);
        setError("Unable to load energy data.");
      } finally {
        setLoading(false);
      }
    }

    loadEnergyData();
  }, []);

  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <div className="p-6 text-white">
        Loading energy data...
      </div>
    );
  }

  // ============================================================
  // ERROR
  // ============================================================

  if (error) {
    return (
      <div className="p-6 text-red-400">
        {error}
      </div>
    );
  }

  // ============================================================
  // PAGE
  // ============================================================

  return (
    <div className="p-6">

      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="mb-7">
        <h1 className="text-3xl font-bold text-white">
          Energy Management
        </h1>

        <p className="text-slate-400 mt-2">
          Bengaluru energy consumption and grid monitoring
        </p>
      </div>


      {/* ======================================================
          KPI CARDS
      ====================================================== */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">

        {/* AVERAGE CONSUMPTION */}

        <div className="bg-[#111a2e] border border-slate-800 rounded-xl p-5">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-slate-400 text-sm">
                Average Consumption
              </p>

              <h2 className="text-white text-3xl font-bold mt-2">
                {Number(
                  summary?.average_consumption ?? 0
                ).toFixed(2)}
              </h2>

              <p className="text-slate-500 text-sm mt-1">
                Energy consumption
              </p>
            </div>

            <Zap
              size={31}
              className="text-yellow-400"
            />

          </div>

        </div>


        {/* RENEWABLE ENERGY */}

        <div className="bg-[#111a2e] border border-slate-800 rounded-xl p-5">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-slate-400 text-sm">
                Renewable Energy
              </p>

              <h2 className="text-white text-3xl font-bold mt-2">
                {Number(
                  summary?.average_renewable ?? 0
                ).toFixed(2)}
              </h2>

              <p className="text-slate-500 text-sm mt-1">
                Average renewable usage
              </p>
            </div>

            <Leaf
              size={31}
              className="text-green-400"
            />

          </div>

        </div>


        {/* PEAK LOAD */}

        <div className="bg-[#111a2e] border border-slate-800 rounded-xl p-5">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-slate-400 text-sm">
                Average Peak Load
              </p>

              <h2 className="text-white text-3xl font-bold mt-2">
                {Number(
                  summary?.average_peak_load ?? 0
                ).toFixed(2)}
              </h2>

              <p className="text-slate-500 text-sm mt-1">
                Peak demand
              </p>
            </div>

            <Gauge
              size={31}
              className="text-orange-400"
            />

          </div>

        </div>


        {/* POWER OUTAGES */}

        <div className="bg-[#111a2e] border border-slate-800 rounded-xl p-5">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-slate-400 text-sm">
                Power Outages
              </p>

              <h2 className="text-white text-3xl font-bold mt-2">
                {Number(
                  summary?.total_outages ?? 0
                ).toLocaleString()}
              </h2>

              <p className="text-slate-500 text-sm mt-1">
                Outage records
              </p>
            </div>

            <AlertTriangle
              size={31}
              className="text-red-400"
            />

          </div>

        </div>

      </div>


      {/* ======================================================
          SECONDARY METRICS
      ====================================================== */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">

        {/* VOLTAGE */}

        <div className="bg-[#111a2e] border border-slate-800 rounded-xl p-5">

          <div className="flex items-center gap-4">

            <Activity
              size={29}
              className="text-cyan-400"
            />

            <div>

              <p className="text-slate-400 text-sm">
                Average Voltage
              </p>

              <h2 className="text-white text-2xl font-bold mt-1">
                {Number(
                  summary?.average_voltage ?? 0
                ).toFixed(2)}
              </h2>

            </div>

          </div>

          <p className="text-slate-500 text-sm mt-3">
            Grid voltage
          </p>

        </div>


        {/* POWER FACTOR */}

        <div className="bg-[#111a2e] border border-slate-800 rounded-xl p-5">

          <div className="flex items-center gap-4">

            <Gauge
              size={29}
              className="text-purple-400"
            />

            <div>

              <p className="text-slate-400 text-sm">
                Average Power Factor
              </p>

              <h2 className="text-white text-2xl font-bold mt-1">
                {Number(
                  summary?.average_power_factor ?? 0
                ).toFixed(3)}
              </h2>

            </div>

          </div>

          <p className="text-slate-500 text-sm mt-3">
            Grid efficiency indicator
          </p>

        </div>

      </div>


      {/* ======================================================
          ENERGY SOURCES
      ====================================================== */}

      <div className="bg-[#111a2e] border border-slate-800 rounded-xl p-6 mb-6">

        <div className="flex items-center gap-3 mb-6">

          <Leaf
            size={25}
            className="text-green-400"
          />

          <div>

            <h2 className="text-xl font-semibold text-white">
              Energy Sources
            </h2>

            <p className="text-slate-500 text-sm mt-1">
              Distribution of energy sources across records
            </p>

          </div>

        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          {Object.entries(sources).map(
            ([source, count]) => (

              <div
                key={source}
                className="bg-[#18233b] rounded-xl p-5"
              >

                <p className="text-slate-400 text-sm">
                  {source}
                </p>

                <h3 className="text-white text-2xl font-bold mt-2">
                  {Number(count).toLocaleString()}
                </h3>

                <p className="text-slate-500 text-xs mt-1">
                  Records
                </p>

              </div>

            )
          )}

        </div>

      </div>


      {/* ======================================================
          POWER OUTAGE RECORDS
      ====================================================== */}

      <div className="bg-[#111a2e] border border-slate-800 rounded-xl p-6">

        <div className="flex items-center gap-3 mb-6">

          <Database
            size={25}
            className="text-red-400"
          />

          <div>

            <h2 className="text-xl font-semibold text-white">
              Power Outage Records
            </h2>

            <p className="text-slate-500 text-sm mt-1">
              Records where power outages were detected
            </p>

          </div>

        </div>


        {outages.length === 0 ? (

          <div className="bg-[#18233b] rounded-xl p-6 text-center">

            <AlertTriangle
              size={28}
              className="text-slate-500 mx-auto mb-2"
            />

            <p className="text-slate-400">
              No power outage records found.
            </p>

          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b border-slate-800">

                  <th className="text-left py-3 px-3 text-slate-400 text-sm">
                    Record ID
                  </th>

                  <th className="text-left py-3 px-3 text-slate-400 text-sm">
                    Zone
                  </th>

                  <th className="text-left py-3 px-3 text-slate-400 text-sm">
                    Consumption
                  </th>

                  <th className="text-left py-3 px-3 text-slate-400 text-sm">
                    Peak Load
                  </th>

                  <th className="text-left py-3 px-3 text-slate-400 text-sm">
                    Energy Source
                  </th>

                  <th className="text-left py-3 px-3 text-slate-400 text-sm">
                    Grid Status
                  </th>

                  <th className="text-left py-3 px-3 text-slate-400 text-sm">
                    Outage
                  </th>

                </tr>

              </thead>


              <tbody>

                {outages
                  .slice(0, 10)
                  .map((record) => (

                    <tr
                      key={record.Record_ID}
                      className="border-b border-slate-800/60"
                    >

                      <td className="py-3 px-3 text-white text-sm">
                        {record.Record_ID}
                      </td>

                      <td className="py-3 px-3 text-slate-300 text-sm">
                        {record.Zone}
                      </td>

                      <td className="py-3 px-3 text-slate-300 text-sm">
                        {record.Energy_Consumption}
                      </td>

                      <td className="py-3 px-3 text-slate-300 text-sm">
                        {record.Peak_Load}
                      </td>

                      <td className="py-3 px-3 text-slate-300 text-sm">
                        {record.Energy_Source}
                      </td>

                      <td className="py-3 px-3 text-slate-300 text-sm">
                        {record.Grid_Status}
                      </td>

                      <td className="py-3 px-3 text-red-400 text-sm font-semibold">
                        {record.Power_Outage}
                      </td>

                    </tr>

                  ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
}

export default Energy;