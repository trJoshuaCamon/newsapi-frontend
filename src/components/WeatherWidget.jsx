import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
  Box,
} from "@mui/material";
import {
  Refresh as RefreshIcon,
  WbSunny as WbSunnyIcon,
  Cloud as CloudIcon,
} from "@mui/icons-material";

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState({
    city: "Mabalacat City", // Default city
    temperature: null,
    description: "",
    icon: "",
    unit: "metric", // Default unit is Celsius (metric)
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); // New error state to handle any API issues

  const fetchWeatherData = async (city, unit = "metric", lat, lon) => {
    setLoading(true); // Set loading to true whenever fetching new data
    setError(""); // Reset any previous error message

    try {
      const query = city ? `city=${city}` : `lat=${lat}&lon=${lon}`;
      const response = await fetch(
        `${BACKEND_BASE_URL}/api/weather/weather?${query}&unit=${unit}` // Ensure unit is passed as "metric"
      );
      const data = await response.json();

      if (response.ok) {
        setWeatherData({
          city: data.city,
          temperature: data.temperature,
          description: data.description,
          icon: data.icon,
          unit: data.unit,
        });
      } else {
        setError(data.error || "Error fetching weather data.");
      }
    } catch (error) {
      setError("Failed to fetch weather data due to a network error.");
      console.error("Error fetching weather data:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  // Get the user's current location
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherData(
            weatherData.city,
            weatherData.unit,
            latitude,
            longitude
          );
        },
        () => {
          // If user denies location access, use the default city (Mabalacat City)
          fetchWeatherData("Mabalacat City", weatherData.unit);
        }
      );
    } else {
      // If geolocation is not supported, use the default city
      fetchWeatherData("Mabalacat City", weatherData.unit);
    }
  };

  // Fetch weather on initial render and location change
  useEffect(() => {
    getLocation();
  }, []);

  return (
    <Box sx={{ width: "100%", maxWidth: 400, margin: "auto", mt: 4 }}>
      <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Weather Information */}
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            {weatherData.city}
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: "lighter", marginTop: 1 }}>
            {loading ? "Loading..." : `${weatherData.temperature} °C`}{" "}
            {/* Always in Celsius */}
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontStyle: "italic", color: "gray", marginTop: 1 }}
          >
            {weatherData.description || "N/A"}
          </Typography>

          {/* Weather Icon */}
          <Box sx={{ mt: 2 }}>
            {weatherData.icon ? (
              <img
                src={weatherData.icon}
                alt={weatherData.description}
                width={50}
              />
            ) : (
              <CloudIcon /> // Default to a cloud icon if there's no weather icon
            )}
          </Box>

          {/* Error Message */}
          {error && (
            <Typography variant="body2" sx={{ color: "red", marginTop: 2 }}>
              {error}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default WeatherWidget;
