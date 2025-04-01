import { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Container, Paper, Typography, Box } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

import Navbar from "./components/Navbar";

import "./App.css";
import MainContent from "./components/MainContent";
import Sidebar from "./components/Sidebar";

export default function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [themeMode, setThemeMode] = useState(() => {
    const storedTheme = localStorage.getItem("themeMode");
    return storedTheme ? JSON.parse(storedTheme) : prefersDarkMode;
  });

  useEffect(() => {
    localStorage.setItem("themeMode", JSON.stringify(themeMode));
  }, [themeMode]);

  const appTheme = createTheme({
    palette: {
      mode: themeMode ? "dark" : "light",
    },
  });

  function handleThemeMode() {
    setThemeMode(!themeMode);
  }

  const isMdScreen = useMediaQuery("(max-width:960px)");

  return (
    <ThemeProvider theme={appTheme}>
      <Paper
        elevation={0}
        square
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh", // Removed fixed height
        }}
      >
        <Navbar themeMode={themeMode} handleThemeMode={handleThemeMode} />

        <Box
          sx={{
            display: "flex",
            flexDirection: isMdScreen ? "column-reverse" : "row",
            flex: 1,
            overflow: "hidden",
          }}
        >
          {/* Main Content */}
          <Box
            sx={{
              flex: isMdScreen ? 1 : 4,
              overflowY: "auto",
              padding: "20px",
              bgcolor: "background.default",
            }}
          >
            <MainContent />
          </Box>

          {/* Sidebar */}
          <Box
            sx={{
              flex: 1, // Ensures sidebar takes up full width on medium screens
              minWidth: "300px",
              minHeight: isMdScreen ? "auto" : "100vh", // Prevents shrinking
              overflowY: "auto",
              padding: "20px",
              backgroundColor: themeMode ? "#252525" : "#eeeeee",
            }}
          >
            <Sidebar />
          </Box>
        </Box>
      </Paper>
    </ThemeProvider>
  );
}
