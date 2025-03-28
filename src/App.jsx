import { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ThemeSwitch from "./components/ThemeSwitch";
import { Container, Paper, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import useMediaQuery from "@mui/material/useMediaQuery";

import "./App.css";

export default function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [themeMode, setThemeMode] = useState(() => {
    // Load from localStorage or fallback to system preference
    const storedTheme = localStorage.getItem("themeMode");
    return storedTheme ? JSON.parse(storedTheme) : prefersDarkMode;
  });

  // Store the theme mode in localStorage
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

  return (
    <>
      <ThemeProvider theme={appTheme}>
        <Paper elevation={0} square>
          <ThemeSwitch
            themeMode={themeMode}
            handleThemeMode={handleThemeMode}
          />

          <h1>Vite + React</h1>
          <p>Click on the Vite and React logos to learn more</p>
        </Paper>
      </ThemeProvider>
    </>
  );
}
