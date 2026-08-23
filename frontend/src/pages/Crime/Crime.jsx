import { useEffect, useState } from "react";

import {
  ShieldAlert,
  AlertTriangle,
  Clock,
  MapPin,
  Activity,
  Database,
} from "lucide-react";

import {
  getCrimeSummary,
  getCrimeTypes,
  getCrimeSeverity,
  getCrimeHotspots,
  getZoneStatistics,
} from "../../services/crimeService";

function Crime() {
  const [summary, setSummary] = useState(null);
  const [crimeTypes, setCrimeTypes] = useState({});
  const [severity, setSeverity] = useState({});
  const [hotspots, setHotspots] = useState([]);
  const [zones, setZones] = useState({});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ============================================================
  // LOAD CRIME DATA
  // ============================================================

  useEffect(() => {
    async function loadCrimeData() {
      try {
        setLoading(true);
        setError("");

        const [
          summaryData,
          typeData,
          severityData,
          hotspotData,
          zoneData,
        ] = await Promise.all([
          getCrimeSummary(),
          getCrimeTypes(),
          getCrimeSeverity(),
          getCrimeHotspots(),
          getZoneStatistics(),
        ]);

        console.log("Crime Summary:", summaryData);
        console.log("Crime Types:", typeData);
        console.log("Crime Severity:", severityData);
        console.log("Crime Hotspots:", hotspotData);
        console.log("Crime Zones:", zoneData);

        setSummary(summaryData);
        setCrimeTypes(typeData || {});
        setSeverity(severityData || {});
        setHotspots(
          Array.isArray(hotspotData)
            ? hotspotData
            : []
        );
        setZones(zoneData || {});
      } catch (err) {
        console.error("Crime API Error:", err);
        setError("Unable to load crime data.");
      } finally {
        setLoading(false);
      }
    }

    loadCrimeData();
  }, []);

  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <div className="p-6 text-white">
        Loading crime data...
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

  return (
    <div className="p-6">

      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="mb-7">
        <h1 className="text-3xl font-bold text-white">
          Crime & Public Safety
        </h1>

        <p className="text-slate-400 mt-2">
          Bengaluru crime monitoring and public safety analysis
        </p>
      </div>


      {/* ======================================================
          KPI CARDS
      ====================================================== */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">

        {/* TOTAL INCIDENTS */}

        <div className="bg-[#111a2e] border border-slate-800 rounded-xl p-5">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-slate-400 text-sm">
                Total Incidents
              </p>

              <h2 className="text-white text-3xl font-bold mt-2">
                {Number(
                  summary?.total_incidents ?? 0
                ).toLocaleString()}
              </h2>

              <p className="text-slate-500 text-sm mt-1">
                Recorded incidents
              </p>
            </div>

            <ShieldAlert
              size={31}
              className="text-red-400"
            />

          </div>

        </div>


        {/* RESPONSE TIME */}

        <div className="bg-[#111a2e] border border-slate-800 rounded-xl p-5">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-slate-400 text-sm">
                Avg Response Time
              </p>

              <h2 className="text-white text-3xl font-bold mt-2">
                {Number(
                  summary?.average_response_time ?? 0
                ).toFixed(2)}
              </h2>

              <p className="text-slate-500 text-sm mt-1">
                Police response time
              </p>
            </div>

            <Clock
              size={31}
              className="text-cyan-400"
            />

          </div>

        </div>


        {/* HOTSPOTS */}

        <div className="bg-[#111a2e] border border-slate-800 rounded-xl p-5">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-slate-400 text-sm">
                Crime Hotspots
              </p>

              <h2 className="text-white text-3xl font-bold mt-2">
                {Number(
                  summary?.hotspot_count ?? 0
                ).toLocaleString()}
              </h2>

              <p className="text-slate-500 text-sm mt-1">
                High-risk records
              </p>
            </div>

            <MapPin
              size={31}
              className="text-orange-400"
            />

          </div>

        </div>


        {/* EMERGENCY ALERTS */}

        <div className="bg-[#111a2e] border border-slate-800 rounded-xl p-5">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-slate-400 text-sm">
                Emergency Alerts
              </p>

              <h2 className="text-white text-3xl font-bold mt-2">
                {Number(
                  summary?.emergency_alerts ?? 0
                ).toLocaleString()}
              </h2>

              <p className="text-slate-500 text-sm mt-1">
                Active alert records
              </p>
            </div>

            <AlertTriangle
              size={31}
              className="text-yellow-400"
            />

          </div>

        </div>

      </div>


      {/* ======================================================
          CRIME TYPES
      ====================================================== */}

      <div className="bg-[#111a2e] border border-slate-800 rounded-xl p-6 mb-6">

        <div className="flex items-center gap-3 mb-6">

          <Activity
            size={25}
            className="text-cyan-400"
          />

          <div>

            <h2 className="text-xl font-semibold text-white">
              Crime Types
            </h2>

            <p className="text-slate-500 text-sm mt-1">
              Distribution of incidents by crime type
            </p>

          </div>

        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          {Object.entries(crimeTypes).map(
            ([type, count]) => (

              <div
                key={type}
                className="bg-[#18233b] rounded-xl p-5"
              >

                <p className="text-slate-400 text-sm">
                  {type}
                </p>

                <h3 className="text-white text-2xl font-bold mt-2">
                  {Number(count).toLocaleString()}
                </h3>

                <p className="text-slate-500 text-xs mt-1">
                  Incidents
                </p>

              </div>

            )
          )}

        </div>

      </div>


      {/* ======================================================
          SEVERITY + ZONES
      ====================================================== */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

        {/* SEVERITY */}

        <div className="bg-[#111a2e] border border-slate-800 rounded-xl p-6">

          <div className="flex items-center gap-3 mb-6">

            <ShieldAlert
              size={24}
              className="text-red-400"
            />

            <div>

              <h2 className="text-xl font-semibold text-white">
                Crime Severity
              </h2>

              <p className="text-slate-500 text-sm mt-1">
                Distribution by severity
              </p>

            </div>

          </div>


          <div className="space-y-3">

            {Object.entries(severity).map(
              ([level, count]) => (

                <div
                  key={level}
                  className="flex items-center justify-between bg-[#18233b] rounded-xl px-5 py-4"
                >

                  <span className="text-slate-300">
                    {level}
                  </span>

                  <span className="text-white font-bold">
                    {Number(count).toLocaleString()}
                  </span>

                </div>

              )
            )}

          </div>

        </div>


        {/* ZONES */}

        <div className="bg-[#111a2e] border border-slate-800 rounded-xl p-6">

          <div className="flex items-center gap-3 mb-6">

            <MapPin
              size={24}
              className="text-orange-400"
            />

            <div>

              <h2 className="text-xl font-semibold text-white">
                Zone Distribution
              </h2>

              <p className="text-slate-500 text-sm mt-1">
                Crime records by city zone
              </p>

            </div>

          </div>


          <div className="space-y-3">

            {Object.entries(zones).map(
              ([zone, count]) => (

                <div
                  key={zone}
                  className="flex items-center justify-between bg-[#18233b] rounded-xl px-5 py-4"
                >

                  <span className="text-slate-300">
                    {zone}
                  </span>

                  <span className="text-white font-bold">
                    {Number(count).toLocaleString()}
                  </span>

                </div>

              )
            )}

          </div>

        </div>

      </div>


      {/* ======================================================
          CRIME HOTSPOTS
      ====================================================== */}

      <div className="bg-[#111a2e] border border-slate-800 rounded-xl p-6">

        <div className="flex items-center gap-3 mb-6">

          <Database
            size={25}
            className="text-red-400"
          />

          <div>

            <h2 className="text-xl font-semibold text-white">
              Crime Hotspots
            </h2>

            <p className="text-slate-500 text-sm mt-1">
              Locations identified as crime hotspots
            </p>

          </div>

        </div>


        {hotspots.length === 0 ? (

          <div className="bg-[#18233b] rounded-xl p-6 text-center">

            <MapPin
              size={28}
              className="text-slate-500 mx-auto mb-2"
            />

            <p className="text-slate-400">
              No crime hotspot records found.
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
                    Crime Type
                  </th>

                  <th className="text-left py-3 px-3 text-slate-400 text-sm">
                    Severity
                  </th>

                  <th className="text-left py-3 px-3 text-slate-400 text-sm">
                    Status
                  </th>

                  <th className="text-left py-3 px-3 text-slate-400 text-sm">
                    Police Station
                  </th>

                  <th className="text-left py-3 px-3 text-slate-400 text-sm">
                    Hotspot
                  </th>

                </tr>

              </thead>


              <tbody>

                {hotspots
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
                        {record.Crime_Type}
                      </td>

                      <td className="py-3 px-3 text-slate-300 text-sm">
                        {record.Crime_Severity}
                      </td>

                      <td className="py-3 px-3 text-slate-300 text-sm">
                        {record.Crime_Status}
                      </td>

                      <td className="py-3 px-3 text-slate-300 text-sm">
                        {record.Police_Station}
                      </td>

                      <td className="py-3 px-3 text-red-400 text-sm font-semibold">
                        {record.Crime_Hotspot}
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

export default Crime;