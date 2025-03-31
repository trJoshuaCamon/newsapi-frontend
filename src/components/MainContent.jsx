import React from "react";
import { Box, Typography } from "@mui/material";
import SpeechToText from "./SpeechToText"; // Example child component
import HeadArticles from "../sections/HeadArticles";
import NewsCardHorizontal from "./NewsCardHorizontal";
import NewsCardVertical from "./NewsCardVertical";

const MainContent = () => {
  return (
    <Box>
      <NewsCardHorizontal />
      <NewsCardVertical />
      {/* <HeadArticles /> */}
      {/* <Typography variant="h4" gutterBottom>
        Main Content Area
      </Typography>

      <Typography variant="body1" paragraph>
        This is your main content section. Add any components, text, or UI
        elements here.
      </Typography> */}

      {/* Example child component */}
      {/* <SpeechToText /> */}
    </Box>
  );
};

export default MainContent;
