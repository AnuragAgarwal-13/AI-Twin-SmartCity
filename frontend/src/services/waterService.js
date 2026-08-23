const API_URL = "http://127.0.0.1:8000";

// ============================================================
// WATER SUMMARY
// ============================================================

export async function getWaterSummary() {
  const response = await fetch(
    `${API_URL}/water/summary`
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch water summary"
    );
  }

  return await response.json();
}


// ============================================================
// WATER LEAKAGES
// ============================================================

export async function getWaterLeakages() {
  const response = await fetch(
    `${API_URL}/water/leakages`
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch water leakage data"
    );
  }

  return await response.json();
}


// ============================================================
// WATER SUPPLY STATISTICS
// ============================================================

export async function getWaterSupplyStatistics() {
  const response = await fetch(
    `${API_URL}/water/supply`
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch water supply statistics"
    );
  }

  return await response.json();
}