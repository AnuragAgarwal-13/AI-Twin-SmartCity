const API_URL = "http://127.0.0.1:8000";

// ============================================================
// CRIME SUMMARY
// ============================================================

export async function getCrimeSummary() {
  const response = await fetch(
    `${API_URL}/crime/summary`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch crime summary");
  }

  return await response.json();
}


// ============================================================
// CRIME TYPE STATISTICS
// ============================================================

export async function getCrimeTypes() {
  const response = await fetch(
    `${API_URL}/crime/types`
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch crime type statistics"
    );
  }

  return await response.json();
}


// ============================================================
// CRIME SEVERITY STATISTICS
// ============================================================

export async function getCrimeSeverity() {
  const response = await fetch(
    `${API_URL}/crime/severity`
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch crime severity statistics"
    );
  }

  return await response.json();
}


// ============================================================
// CRIME HOTSPOTS
// ============================================================

export async function getCrimeHotspots() {
  const response = await fetch(
    `${API_URL}/crime/hotspots`
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch crime hotspots"
    );
  }

  return await response.json();
}


// ============================================================
// ZONE STATISTICS
// ============================================================

export async function getZoneStatistics() {
  const response = await fetch(
    `${API_URL}/zones`
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch zone statistics"
    );
  }

  return await response.json();
}