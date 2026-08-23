const API_URL = "http://127.0.0.1:8000";

// ============================================================
// ENERGY SUMMARY
// ============================================================

export async function getEnergySummary() {
  const response = await fetch(
    `${API_URL}/energy/summary`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch energy summary");
  }

  return await response.json();
}


// ============================================================
// ENERGY SOURCE STATISTICS
// ============================================================

export async function getEnergySources() {
  const response = await fetch(
    `${API_URL}/energy/sources`
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch energy source statistics"
    );
  }

  return await response.json();
}


// ============================================================
// POWER OUTAGE RECORDS
// ============================================================

export async function getEnergyOutages() {
  const response = await fetch(
    `${API_URL}/energy/outages`
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch power outage records"
    );
  }

  return await response.json();
}