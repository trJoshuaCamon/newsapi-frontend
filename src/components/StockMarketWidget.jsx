// src/components/StockMarketWidget.js
import React from "react";
import SingleStockRow from "./SingleStockRow"; // Import the renamed component
import { Box, Typography, List, Divider, Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// --- Define the list of stock symbols ---
// This list is now managed within this widget component
const topStockSymbols = ["AAPL", "MSFT", "GOOGL", "AMZN", "NVDA", "TSLA"];

function StockMarketWidget() {
  const theme = useTheme();

  return (
    // Use Paper for the background/container effect
    <Paper
      elevation={2}
      sx={{
        marginTop: 2,
        borderRadius: 3,
        bgcolor: "background.paper",
        overflow: "hidden",
        width: "100%",
      }}
    >
      {" "}
      {/* Ensure it takes width */}
      {/* Header Section inside the Paper */}
      <Box
        sx={{
          p: 2,
          borderBottom: 1,
          borderColor: "divider",
          backgroundColor: theme.palette.mode === "dark" ? "#333" : "#f8f9fa",
        }}
      >
        {" "}
        {/* Add padding and bottom border */}
        <Typography sx={{ fontWeight: "bold" }} variant="h6" component="h2">
          Market Overview {/* Header */}
        </Typography>
      </Box>
      {/* List Section */}
      <List disablePadding>
        {" "}
        {/* Keep padding disabled */}
        {topStockSymbols.map((symbol, index) => (
          <React.Fragment key={symbol}>
            {/* Render the component for a single stock row */}
            <SingleStockRow symbol={symbol} />

            {/* Add Divider between items, but not after the last one */}
            {index < topStockSymbols.length - 1 && (
              <Divider
                component="li" // Keep as list item for semantics
                sx={(theme) => ({
                  // Access theme for conditional styling
                  // Apply desired styles
                  borderWidth: 1.5,
                  margin: "5px 0", // Vertical margin for spacing
                  // Conditional border color based on theme mode
                  borderColor:
                    theme.palette.mode === "dark"
                      ? "rgba(73, 71, 71, 0.4)" // Specific dark mode color
                      : "rgba(0, 0, 0, 0.12)", // Standard light mode divider
                })}
              />
            )}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
}

export default StockMarketWidget;
