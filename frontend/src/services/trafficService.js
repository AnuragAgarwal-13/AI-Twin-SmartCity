const BASE_URL = "http://127.0.0.1:8000";

export async function getDashboardSummary() {
  const response = await fetch(`${BASE_URL}/dashboard`);

  if (!response.ok) {
    throw new Error("Failed to fetch dashboard data");
  }

  return await response.json();
}

export async function getAllTraffic() {
  const response = await fetch(`${BASE_URL}/traffic`);

  if (!response.ok) {
    throw new Error("Failed to fetch traffic data");
  }

  return await response.json();
}

export async function filterTraffic(
  roadId = "",
  weather = "",
  density = ""
) {
  const params = new URLSearchParams();

  if (roadId.trim()) {
    params.append("road_id", roadId.trim());
  }

  if (weather !== "" && weather !== "All Weather") {
    params.append("weather", weather);
  }

  if (density !== "" && density !== "All Density") {
    params.append("density", density);
  }

  const response = await fetch(
    `${BASE_URL}/traffic/filter?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error("Failed to filter traffic");
  }

  return await response.json();
}

export async function getAllRecords() {
  const response = await fetch(`${BASE_URL}/records`);

  if (!response.ok) {
    throw new Error("Failed to fetch smart city records");
  }

  return await response.json();
}