const BASE_URL = "http://127.0.0.1:8000";

// =======================================
// Weather Summary
// =======================================
export async function getWeatherSummary() {
  const response = await fetch(`${BASE_URL}/weather/summary`);

  if (!response.ok) {
    throw new Error("Failed to fetch weather summary");
  }

  return await response.json();
}

// =======================================
// Weather Filter
// =======================================
export async function filterWeather(
  weather = "",
  temperature = "",
  humidity = ""
) {
  const params = new URLSearchParams();

  if (weather !== "" && weather !== "All Weather") {
    params.append("weather", weather);
  }

  if (temperature !== "" && temperature !== "All Temperature") {
    params.append("temperature", temperature);
  }

  if (humidity !== "" && humidity !== "All Humidity") {
    params.append("humidity", humidity);
  }

  const response = await fetch(
    `${BASE_URL}/weather/filter?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch weather records");
  }

  return await response.json();
}