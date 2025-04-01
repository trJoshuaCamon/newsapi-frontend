import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
} from "@mui/material";

import CircularProgress from "@mui/material/CircularProgress";

import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

const stackProps = {
  direction: { xs: "column", md: "row" },
  spacing: 0,
  sx: { marginBottom: { xs: "15px", md: "20px", lg: "30px" } },
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "center",
};

const ViewPost = () => {
  const location = useLocation();
  const { article } = location.state || {}; // Safely access state

  const formattedDate = new Date(article.publishedAt).toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }
  );

  // async function getFullArticleContent(url) {
  //   try {
  //     const response = await fetch(url);
  //     const text = await response.text();
  //     console.log(text); // The full HTML content of the page
  //   } catch (error) {
  //     console.error("Error fetching article:", error);
  //   }
  // }

  // getFullArticleContent(article.url);

  if (!article) {
    return <Typography variant="h6">Article not found</Typography>;
  }

  return (
    <Box {...stackProps}>
      <Grid container spacing={4}>
        {/* Left side: Image */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              height="auto"
              image={article.urlToImage}
              alt={article.title}
              sx={{ objectFit: "cover" }}
            />
          </Card>
        </Grid>

        {/* Right side: Text content */}
        <Grid item xs={12} md={6}>
          <Typography variant="h3" gutterBottom>
            {article.title}
          </Typography>

          <Typography variant="h6" color="text.secondary" gutterBottom>
            By {article.author} | Published on {formattedDate}
          </Typography>

          <Typography variant="body2" color="text.secondary" gutterBottom>
            Source: &nbsp;
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              {article.source.name}
            </a>
          </Typography>

          <Typography variant="body1" paragraph>
            {article.description}
          </Typography>

          <Typography variant="body2" paragraph>
            {article.content}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ViewPost;
