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
      <NewsCardHorizontal article={firstTopHeadline_article} />

      <Stack {...stackProps}>
        {fourTopHeadline_articles.map((article, index) => (
          <NewsCardVertical key={index} article={article} />
        ))}
      </Stack>

      <Divider />

      <NewsCarousel label="Business" passedArticles={allArticles.business} />
      <Divider />

      <NewsCarousel
        label="Entertainment"
        passedArticles={allArticles.entertainment}
      />
      <Divider sx={{ marginBottom: "20px" }} />

      <NewsCarousel label="General" passedArticles={allArticles.general} />
      <Divider />

      <NewsCarousel label="Health" passedArticles={allArticles.health} />
      <Divider />

      <NewsCarousel label="Science" passedArticles={allArticles.science} />
      <Divider />

      <NewsCarousel label="Sports" passedArticles={allArticles.sports} />
      <Divider />

      <NewsCarousel
        label="Technology"
        passedArticles={allArticles.technology}
      />
      <Divider />
    </Box>
  );
};

export default MainContent;
