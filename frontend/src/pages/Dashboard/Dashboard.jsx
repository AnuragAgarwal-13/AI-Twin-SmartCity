import KpiCards from "../../components/cards/KpiCards";
import SmartCityMap from "../../components/map/SmartCityMap";

function Dashboard() {
  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold text-white">
          Smart City Dashboard
        </h1>

        <p className="text-slate-400 mt-2">
          AI-powered urban monitoring and analytics
        </p>
      </div>

      {/* KPI CARDS */}
      <KpiCards />

      {/* GIS MAP */}
      <SmartCityMap />

    </div>
  );
}

export default Dashboard;