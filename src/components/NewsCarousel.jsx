import React, { useRef } from "react";
import {
  Box,
  Stack,
  CircularProgress,
  Typography,
  IconButton,
} from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import NewsCardVertical from "./NewsCardVertical";

const NewsCarousel = ({ remainingArticles }) => {
  // Reference to the Box containing the articles
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      // Scroll the container to the left by a certain amount
      scrollContainerRef.current.scrollBy({
        left: -700, // Adjust this value to control the scroll distance
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      // Scroll the container to the right by a certain amount
      scrollContainerRef.current.scrollBy({
        left: 700, // Adjust this value to control the scroll distance
        behavior: "smooth",
      });
    }
  };

  return (
    <Box sx={{ width: "100%", position: "relative" }}>
      <Typography variant="h4" sx={{ marginBlock: "20px" }}>
        Latest Articles
      </Typography>

      {remainingArticles.length > 0 ? (
        <Box sx={{ position: "relative" }}>
          {/* Left scroll button */}
          <IconButton
            onClick={scrollLeft}
            sx={{
              position: "absolute",
              left: 10, // Add margin to place the button inside the container
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 2, // Ensure it's above other elements
              color: "white", // White arrow icon for better contrast
              backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background for better visibility
              borderRadius: "50%", // Round shape for the button
              padding: "10px", // Padding for a larger clickable area
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", // Subtle shadow for depth
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.7)", // Darker background on hover
                boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)", // More intense shadow on hover
              },
            }}
          >
            <ArrowBack />
          </IconButton>
          {/* Scrollable container */}
          <Box
            sx={{
              display: "flex",
              overflowX: "auto",
              width: "100%",
              alignItems: "center",
            }}
            ref={scrollContainerRef}
          >
            <Stack
              direction="row"
              spacing={2}
              sx={{
                display: "flex",
                flexWrap: "nowrap",
                width: "max-content",
              }}
            >
              {remainingArticles.map((article, index) => (
                <NewsCardVertical key={index} article={article} />
              ))}
            </Stack>
          </Box>

          {/* Right scroll button */}
          <IconButton
            onClick={scrollRight}
            sx={{
              position: "absolute",
              right: 10, // Add margin to place the button inside the container
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 2, // Ensure it's above other elements
              color: "white", // White arrow icon for better contrast
              backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background for better visibility
              borderRadius: "50%", // Round shape for the button
              padding: "10px", // Padding for a larger clickable area
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", // Subtle shadow for depth
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.7)", // Darker background on hover
                boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)", // More intense shadow on hover
              },
            }}
          >
            <ArrowForward />
          </IconButton>
        </Box>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default NewsCarousel;
