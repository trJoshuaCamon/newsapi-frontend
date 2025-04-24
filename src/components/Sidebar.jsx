import React from "react";
import { Box, Typography, Button, Paper, List } from "@mui/material";
import TopHeadlinesSidebar from "./TopHeadlinesSidebar";
import StockMarketWidget from "./StockMarketWidget";

const Sidebar = ({ allArticles }) => {
  return (
    <Box sx={{ overflow: "auto" }}>
      <TopHeadlinesSidebar allArticles={allArticles} />

      <StockMarketWidget />
    </Box>
  );
};

export default Sidebar;
