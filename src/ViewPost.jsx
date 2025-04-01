import React, { useState, useEffect } from "react";
import { Box, Typography, Stack } from "@mui/material";

import CircularProgress from "@mui/material/CircularProgress";

import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

const ViewPost = () => {
  const location = useLocation();
  const { article } = location.state || {}; // Safely access state
  const { id } = useParams();

  if (!article) {
    return <Typography variant="h6">Article not found</Typography>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        zIndex: 9999,
      }}
    >
      {id}
      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <CircularProgress size={60} color="primary" />
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          Loading...
        </Typography>
      </Box>

      <Box>
        <Typography variant="h4">{article.title}</Typography>
        <Typography variant="body1">{article.description}</Typography>
        <img src={article.urlToImage} alt={article.title} />
        {/* Other article details */}
      </Box>
    </Box>
  );
};

export default ViewPost;
