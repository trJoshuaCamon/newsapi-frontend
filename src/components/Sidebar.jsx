import React from "react";
import { Box, Typography, Button, Paper, List } from "@mui/material";
import TopHeadlinesSidebar from "./TopHeadlinesSidebar";
import StockMarketWidget from "./StockMarketWidget";
import WeatherWidget from "./WeatherWidget";
import ZodiacWidget from "./ZodiacWidget";

const Sidebar = ({ allArticles }) => {
  return (
    <Box sx={{ overflow: "auto" }}>
      <ZodiacWidget />
      <TopHeadlinesSidebar allArticles={allArticles} />

      <WeatherWidget />

      <StockMarketWidget />
    </Box>
  );
};

export default Sidebar;
