const API_URL = "http://127.0.0.1:8000";


// ============================================================
// AIR QUALITY SUMMARY
// ============================================================

export async function getAirQualitySummary() {
  const response = await fetch(
    `${API_URL}/air-quality/summary`
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch air quality summary"
    );
  }

  return await response.json();
}


// ============================================================
// AIR QUALITY FILTER
// ============================================================

export async function filterAirQuality(
  category = "",
  status = ""
) {
  const params = new URLSearchParams();

  if (category) {
    params.append("category", category);
  }

  if (status) {
    params.append("status", status);
  }

  const url =
    `${API_URL}/air-quality/filter` +
    (params.toString()
      ? `?${params.toString()}`
      : "");

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      "Failed to filter air quality data"
    );
  }

  return await response.json();
}


// ============================================================
// AQI CATEGORY STATISTICS
// ============================================================

export async function getAQICategories() {
  const response = await fetch(
    `${API_URL}/air-quality/categories`
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch AQI category statistics"
    );
  }

  return await response.json();
}