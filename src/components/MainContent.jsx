import React, { useState, useEffect } from "react";
import { Box, Typography, Stack } from "@mui/material";
import NewsCardHorizontal from "./NewsCardHorizontal";
import NewsCardVertical from "./NewsCardVertical";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import NewsCarousel from "./NewsCarousel";

const stackProps = {
  direction: { xs: "column", md: "row" },
  spacing: 0,
  sx: { marginBottom: { xs: "15px", md: "20px", lg: "30px" } },
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "center",
};

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const PAGE_SIZE = 20;
const COUNTRY = "us";
const CATEGORY = "top-headlines";
const URL = `https://newsapi.org/v2/${CATEGORY}?country=${COUNTRY}&pageSize=${PAGE_SIZE}&apiKey=${API_KEY}`;

const MainContent = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(URL);
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        const data = await response.json();
        setArticles(data.articles);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const firstArticle = articles[0];
  const remainingArticles = articles.slice(1);

  console.log(articles);

  return (
    <Box>
      {firstArticle ? (
        <NewsCardHorizontal article={firstArticle} />
      ) : (
        // <Typography>Loading first article...</Typography>
        <Box
          display="flex"
          alignItems="center"
          justifyContent={"center"}
          sx={{ width: "100%", marginBlock: "40px" }}
        >
          <CircularProgress />
        </Box>
      )}

      <Stack {...stackProps}>
        {remainingArticles.length > 0 ? (
          remainingArticles.map((article, index) => (
            <NewsCardVertical key={index} article={article} />
          ))
        ) : (
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        )}
      </Stack>

      <Divider />

      {/* BUSINESS */}
      <Divider />
      <NewsCarousel remainingArticles={remainingArticles} />

      {/* ENTERTAINMENT */}
      <Divider />

      {/* SPORTS */}
      <Divider />
    </Box>
  );
};

export default MainContent;
