import { Outlet } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex">

      {/* ================= SIDEBAR ================= */}
      <Sidebar />

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-1 min-w-0 flex flex-col">

        {/* ================= NAVBAR ================= */}
        <Navbar />

        {/* ================= PAGE CONTENT ================= */}
        <main className="flex-1 bg-slate-900 overflow-y-auto">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default MainLayout;