import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const ZodiacWidget = () => {
  const [zodiacData, setZodiacData] = useState({
    sign: "Aries", // Default zodiac sign
    horoscope: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const zodiacSigns = [
    "Aries",
    "Taurus",
    "Gemini",
    "Cancer",
    "Leo",
    "Virgo",
    "Libra",
    "Scorpio",
    "Sagittarius",
    "Capricorn",
    "Aquarius",
    "Pisces",
  ];

  const fetchZodiacData = async (sign) => {
    setLoading(true);
    setError(""); // Reset any previous error

    try {
      const response = await fetch(
        `${BACKEND_BASE_URL}/api/zodiac/horoscope?sign=${sign}&day=TODAY`
      );
      const data = await response.json();

      if (response.ok) {
        setZodiacData({
          sign: data.sign,
          horoscope: data.horoscope,
        });
      } else {
        setError(data.error || "Error fetching horoscope data.");
      }
    } catch (error) {
      setError("Failed to fetch horoscope data due to a network error.");
      console.error("Error fetching horoscope data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch horoscope data whenever the selected zodiac sign changes
  useEffect(() => {
    fetchZodiacData(zodiacData.sign);
  }, [zodiacData.sign]);

  return (
    <Box sx={{ width: "100%", maxWidth: 400, margin: "auto", mb: 4 }}>
      <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Zodiac Sign Dropdown */}
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel id="zodiac-select-label">Choose Your Zodiac</InputLabel>
            <Select
              labelId="zodiac-select-label"
              value={zodiacData.sign}
              onChange={(e) =>
                setZodiacData({ ...zodiacData, sign: e.target.value })
              }
              label="Choose Your Zodiac"
            >
              {zodiacSigns.map((sign) => (
                <MenuItem key={sign} value={sign}>
                  {sign}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Zodiac Horoscope */}
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            {loading
              ? "Loading..."
              : `Today's Horoscope for ${zodiacData.sign}`}
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontStyle: "italic", color: "gray", marginTop: 1 }}
          >
            {loading ? <CircularProgress /> : zodiacData.horoscope || "N/A"}
          </Typography>

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

export default ZodiacWidget;
