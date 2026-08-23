import { useEffect, useState } from "react";

import {
  Droplets,
  Gauge,
  AlertTriangle,
  Database,
  Activity,
} from "lucide-react";

import {
  getWaterSummary,
  getWaterLeakages,
  getWaterSupplyStatistics,
} from "../../services/waterService";


function Water() {

  const [summary, setSummary] = useState(null);
  const [leakages, setLeakages] = useState([]);
  const [supply, setSupply] = useState({});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // ============================================================
  // LOAD WATER DATA
  // ============================================================

  useEffect(() => {

    async function loadWaterData() {

      try {

        setLoading(true);
        setError("");

        const [
          summaryData,
          leakageData,
          supplyData,
        ] = await Promise.all([

          getWaterSummary(),

          getWaterLeakages(),

          getWaterSupplyStatistics(),

        ]);


        setSummary(summaryData);

        setLeakages(leakageData);

        setSupply(supplyData);

      } catch (err) {

        console.error(
          "Water API Error:",
          err
        );

        setError(
          "Unable to load water data."
        );

      } finally {

        setLoading(false);

      }
    }


    loadWaterData();

  }, []);


  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {

    return (
      <div className="p-6 text-white">
        Loading water data...
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

      {/* HEADER */}

      <div className="mb-6">

        <h1 className="text-3xl font-bold text-white">
          Water Management
        </h1>

        <p className="text-slate-400 mt-1">
          Bengaluru water supply and infrastructure monitoring
        </p>

      </div>


      {/* ======================================================
          KPI CARDS
      ====================================================== */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">


        {/* WATER LEVEL */}

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-slate-400 text-sm">
                Average Water Level
              </p>

              <h2 className="text-white text-3xl font-bold mt-2">

                {Number(
                  summary?.average_water_level ?? 0
                ).toFixed(2)}

              </h2>

              <p className="text-slate-500 text-sm mt-1">
                Current dataset average
              </p>

            </div>

            <Droplets
              size={30}
              className="text-blue-400"
            />

          </div>

        </div>


        {/* WATER CONSUMPTION */}

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">

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
                Water consumption
              </p>

            </div>

            <Activity
              size={30}
              className="text-cyan-400"
            />

          </div>

        </div>


        {/* WATER PRESSURE */}

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-slate-400 text-sm">
                Average Pressure
              </p>

              <h2 className="text-white text-3xl font-bold mt-2">

                {Number(
                  summary?.average_pressure ?? 0
                ).toFixed(2)}

              </h2>

              <p className="text-slate-500 text-sm mt-1">
                Pipeline pressure
              </p>

            </div>

            <Gauge
              size={30}
              className="text-purple-400"
            />

          </div>

        </div>


        {/* LEAKAGES */}

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-slate-400 text-sm">
                Leakage Records
              </p>

              <h2 className="text-white text-3xl font-bold mt-2">

                {Number(
                  summary?.leakage_count ?? 0
                ).toLocaleString()}

              </h2>

              <p className="text-slate-500 text-sm mt-1">
                Detected leakage records
              </p>

            </div>

            <AlertTriangle
              size={30}
              className="text-red-400"
            />

          </div>

        </div>

      </div>


      {/* ======================================================
          WATER SUPPLY
      ====================================================== */}

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-6">

        <div className="flex items-center gap-3 mb-5">

          <Droplets
            size={22}
            className="text-blue-400"
          />

          <div>

            <h2 className="text-xl font-semibold text-white">
              Water Supply Status
            </h2>

            <p className="text-slate-500 text-sm">
              Distribution of supply status across records
            </p>

          </div>

        </div>


        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          {Object.entries(supply).map(
            ([status, count]) => (

              <div
                key={status}
                className="bg-slate-800/60 rounded-lg p-4"
              >

                <p className="text-slate-400 text-sm">
                  {status}
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


      {/* ======================================================
          LEAKAGE RECORDS
      ====================================================== */}

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">

        <div className="flex items-center gap-3 mb-5">

          <Database
            size={22}
            className="text-red-400"
          />

          <div>

            <h2 className="text-xl font-semibold text-white">
              Water Leakage Records
            </h2>

            <p className="text-slate-500 text-sm">
              Records where water leakage has been detected
            </p>

          </div>

        </div>


        {leakages.length === 0 ? (

          <div className="text-slate-500 text-sm">
            No leakage records found.
          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead>

                <tr className="border-b border-slate-800">

                  <th className="py-3 px-3 text-slate-400 text-sm">
                    Record ID
                  </th>

                  <th className="py-3 px-3 text-slate-400 text-sm">
                    Zone
                  </th>

                  <th className="py-3 px-3 text-slate-400 text-sm">
                    Water Level
                  </th>

                  <th className="py-3 px-3 text-slate-400 text-sm">
                    Pressure
                  </th>

                  <th className="py-3 px-3 text-slate-400 text-sm">
                    Supply
                  </th>

                  <th className="py-3 px-3 text-slate-400 text-sm">
                    Leakage
                  </th>

                </tr>

              </thead>


              <tbody>

                {leakages
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
                        {record.Water_Level}
                      </td>

                      <td className="py-3 px-3 text-slate-300 text-sm">
                        {record.Water_Pressure}
                      </td>

                      <td className="py-3 px-3 text-slate-300 text-sm">
                        {record.Supply_Status}
                      </td>

                      <td className="py-3 px-3 text-red-400 text-sm font-medium">
                        {record.Leakage}
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


export default Water;