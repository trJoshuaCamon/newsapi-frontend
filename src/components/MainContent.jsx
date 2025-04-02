import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import NewsCardHorizontal from "./NewsCardHorizontal";
import NewsCardVertical from "./NewsCardVertical";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import NewsCarousel from "./NewsCarousel";
import FullPageLoading from "./FullPageLoading";

const stackProps = {
  direction: { xs: "column", md: "row" },
  spacing: 0,
  sx: { marginBottom: { xs: "15px", md: "20px", lg: "30px" } },
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "center",
};

const MainContent = ({ allArticles }) => {
  const firstTopHeadline_article = allArticles.topHeadlines[0];
  const fourTopHeadline_articles = allArticles.topHeadlines.slice(1, 5);

  return (
    <Box>
      <Box id="News">
        <NewsCardHorizontal article={firstTopHeadline_article} />
      </Box>

      <Stack {...stackProps}>
        {fourTopHeadline_articles.map((article, index) => (
          <NewsCardVertical key={index} article={article} />
        ))}
      </Stack>

      <Divider />
      <Box id="Business">
        <NewsCarousel label="Business" passedArticles={allArticles.business} />
      </Box>
      <Divider />

      <Box id="Entertainment">
        <NewsCarousel
          label="Entertainment"
          passedArticles={allArticles.entertainment}
        />
      </Box>
      <Divider />

      <Box id="General">
        <NewsCarousel label="General" passedArticles={allArticles.general} />
      </Box>
      <Divider />

      <Box id="Health">
        <NewsCarousel label="Health" passedArticles={allArticles.health} />
      </Box>

      <Divider />

      <Box id="Science">
        <NewsCarousel label="Science" passedArticles={allArticles.science} />
      </Box>
      <Divider />

      <Box id="Sports">
        <NewsCarousel label="Sports" passedArticles={allArticles.sports} />
      </Box>
      <Divider />

      <Box id="Technology">
        <NewsCarousel
          label="Technology"
          passedArticles={allArticles.technology}
        />
      </Box>
      <Divider />
    </Box>
  );
};

export default MainContent;
