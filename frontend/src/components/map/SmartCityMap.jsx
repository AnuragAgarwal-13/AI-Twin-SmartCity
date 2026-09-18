import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  CircleMarker,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { getAllTraffic } from "../../services/trafficService";

// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

function SmartCityMap() {
  const [trafficData, setTrafficData] = useState([]);
  const [loading, setLoading] = useState(true);

  const bengaluru = [12.9716, 77.5946];

  useEffect(() => {
    async function loadTrafficData() {
      try {
        const data = await getAllTraffic();

        // Keep only records with valid coordinates
        const validData = data.filter(
          (item) =>
            item.Latitude !== null &&
            item.Longitude !== null &&
            !isNaN(Number(item.Latitude)) &&
            !isNaN(Number(item.Longitude))
        );

        setTrafficData(validData);
      } catch (error) {
        console.error("Error loading GIS traffic data:", error);
      } finally {
        setLoading(false);
      }
    }

    loadTrafficData();
  }, []);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">

      {/* Header */}
      <div className="p-5 border-b border-slate-800">
        <div className="flex items-center justify-between">

          <div>
            <h2 className="text-xl font-semibold text-white">
              Smart City GIS Map
            </h2>

            <p className="text-sm text-slate-400 mt-1">
              Bengaluru real-time city monitoring
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full"></span>

            <span className="text-sm text-green-400">
              {loading
                ? "Loading..."
                : `${trafficData.length} Locations`}
            </span>
          </div>

        </div>
      </div>

      {/* Map */}
      <div
        className="w-full"
        style={{
          height: "500px",
          minHeight: "500px",
        }}
      >
        <MapContainer
          center={bengaluru}
          zoom={12}
          scrollWheelZoom={true}
          className="w-full"
          style={{
            height: "500px",
            width: "100%",
          }}
        >

          {/* OpenStreetMap */}
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Bengaluru Center */}
          <Marker position={bengaluru}>
            <Popup>
              <strong>Bengaluru Smart City</strong>
              <br />
              AI Twin monitoring center
            </Popup>
          </Marker>

          {/* REAL TRAFFIC DATA */}
          {trafficData.map((item) => (
            <CircleMarker
              key={item.Record_ID}
              center={[
                Number(item.Latitude),
                Number(item.Longitude),
              ]}
              radius={7}
              pathOptions={{
                color:
                  item.Traffic_Density?.toLowerCase() === "high"
                    ? "red"
                    : item.Traffic_Density?.toLowerCase() === "medium"
                    ? "orange"
                    : "green",

                fillColor:
                  item.Traffic_Density?.toLowerCase() === "high"
                    ? "red"
                    : item.Traffic_Density?.toLowerCase() === "medium"
                    ? "orange"
                    : "green",

                fillOpacity: 0.65,
              }}
            >
              <Popup>
                <div className="text-sm">

                  <strong>Traffic Location</strong>

                  <br />
                  Road ID: {item.Road_ID}

                  <br />
                  Vehicle Count: {item.Vehicle_Count}

                  <br />
                  Average Speed: {item.Avg_Speed} km/h

                  <br />
                  Traffic Density: {item.Traffic_Density}

                  <br />
                  Weather: {item.Weather}

                  <br />
                  Road Condition: {item.Road_Condition}

                </div>
              </Popup>
            </CircleMarker>
          ))}

        </MapContainer>
      </div>

      {/* Legend */}
      <div className="p-4 border-t border-slate-800 flex flex-wrap gap-5 text-sm">

        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500"></span>
          High Traffic
        </div>

        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-orange-500"></span>
          Medium Traffic
        </div>

        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-green-500"></span>
          Low Traffic
        </div>

      </div>

    </div>
  );
}

export default SmartCityMap;