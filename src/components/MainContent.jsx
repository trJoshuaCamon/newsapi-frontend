import React, { useState, useEffect } from "react";
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

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const PAGE_SIZE = 100;
const COUNTRY = "us";

const categories = [
  "business",
  "entertainment",
  "general",
  "health",
  "science",
  "sports",
  "technology",
];

// Default
const topHeadline_URL = `https://newsapi.org/v2/top-headlines?country=${COUNTRY}&pageSize=${PAGE_SIZE}&apiKey=${API_KEY}`;

// Category URLs
const URL_business = `https://newsapi.org/v2/top-headlines?category=${categories[0]}&country=${COUNTRY}&pageSize=${PAGE_SIZE}&apiKey=${API_KEY}`;
const URL_entertainment = `https://newsapi.org/v2/top-headlines?category=${categories[1]}&country=${COUNTRY}&pageSize=${PAGE_SIZE}&apiKey=${API_KEY}`;
const URL_general = `https://newsapi.org/v2/top-headlines?category=${categories[2]}&country=${COUNTRY}&pageSize=${PAGE_SIZE}&apiKey=${API_KEY}`;
const URL_health = `https://newsapi.org/v2/top-headlines?category=${categories[3]}&country=${COUNTRY}&pageSize=${PAGE_SIZE}&apiKey=${API_KEY}`;
const URL_science = `https://newsapi.org/v2/top-headlines?category=${categories[4]}&country=${COUNTRY}&pageSize=${PAGE_SIZE}&apiKey=${API_KEY}`;
const URL_sports = `https://newsapi.org/v2/top-headlines?category=${categories[5]}&country=${COUNTRY}&pageSize=${PAGE_SIZE}&apiKey=${API_KEY}`;
const URL_technology = `https://newsapi.org/v2/top-headlines?category=${categories[6]}&country=${COUNTRY}&pageSize=${PAGE_SIZE}&apiKey=${API_KEY}`;

const MainContent = () => {
  const [articles, setArticles] = useState({
    topHeadlines: [],
    business: [],
    entertainment: [],
    general: [],
    health: [],
    science: [],
    sports: [],
    technology: [],
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseTopHeadlines = await fetch(topHeadline_URL);

        // Fetch data for each category
        const responseBusiness = await fetch(URL_business);
        const responseEntertainment = await fetch(URL_entertainment);
        const responseGeneral = await fetch(URL_general);
        const responseHealth = await fetch(URL_health);
        const responseScience = await fetch(URL_science);
        const responseSports = await fetch(URL_sports);
        const responseTechnology = await fetch(URL_technology);

        // Check if all responses are successful
        if (
          !responseTopHeadlines.ok ||
          !responseBusiness.ok ||
          !responseEntertainment.ok ||
          !responseGeneral.ok ||
          !responseHealth.ok ||
          !responseScience.ok ||
          !responseSports.ok ||
          !responseTechnology.ok
        ) {
          throw new Error("Failed to fetch articles");
        }

        const dataTopHeadlines = await responseTopHeadlines.json();

        // Parse the data from each response
        const dataBusiness = await responseBusiness.json();
        const dataEntertainment = await responseEntertainment.json();
        const dataGeneral = await responseGeneral.json();
        const dataHealth = await responseHealth.json();
        const dataScience = await responseScience.json();
        const dataSports = await responseSports.json();
        const dataTechnology = await responseTechnology.json();

        // Set the articles for each category
        setArticles({
          topHeadlines: dataTopHeadlines.articles,
          business: dataBusiness.articles,
          entertainment: dataEntertainment.articles,
          general: dataGeneral.articles,
          health: dataHealth.articles,
          science: dataScience.articles,
          sports: dataSports.articles,
          technology: dataTechnology.articles,
        });
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <FullPageLoading />; // Uniform loading state
  }

  if (error) {
    return <Typography variant="h6">Error: {error}</Typography>; // More friendly error display
  }

  const firstTopHeadline_article = articles.topHeadlines[0];
  const fourTopHeadline_articles = articles.topHeadlines.slice(1, 5);

  // // Render first article for each category
  // const firstBusinessArticle = articles.business[0];
  // const firstEntertainmentArticle = articles.entertainment[0];
  // const firstGeneralArticle = articles.general[0];
  // const firstHealthArticle = articles.health[0];
  // const firstScienceArticle = articles.science[0];
  // const firstSportsArticle = articles.sports[0];
  // const firstTechnologyArticle = articles.technology[0];

  // // Render four remaining articles for each category
  // const remainingBusinessArticles = articles.business.slice(1, 5);
  // const remainingEntertainmentArticles = articles.entertainment.slice(1, 5);
  // const remainingGeneralArticles = articles.general.slice(1, 5);
  // const remainingHealthArticles = articles.health.slice(1, 5);
  // const remainingScienceArticles = articles.science.slice(1, 5);
  // const remainingSportsArticles = articles.sports.slice(1, 5);
  // const remainingTechnologyArticles = articles.technology.slice(1, 5);

  // const sportsArticles = articles.filter(
  //   (article) => article.category === "sports"
  // );
  // const businessArticles = articles.filter(
  //   (article) => article.category === "business"
  // );
  // const technologyArticles = articles.filter(
  //   (article) => article.category === "technology"
  // );
  // const entertainmentArticles = articles.filter(
  //   (article) => article.category === "entertainment"
  // );
  // const healthArticles = articles.filter(
  //   (article) => article.category === "health"
  // );
  // const scienceArticles = articles.filter(
  //   (article) => article.category === "science"
  // );

  return (
    <Box>
      <NewsCardHorizontal article={firstTopHeadline_article} />

      <Stack {...stackProps}>
        {fourTopHeadline_articles.map((article, index) => (
          <NewsCardVertical key={index} article={article} />
        ))}
      </Stack>

      <Divider />

      <NewsCarousel label="Business" passedArticles={articles.business} />
      <Divider />

      <NewsCarousel
        label="Entertainment"
        passedArticles={articles.entertainment}
      />
      <Divider />

      <NewsCarousel label="General" passedArticles={articles.general} />
      <Divider />

      <NewsCarousel label="Health" passedArticles={articles.health} />
      <Divider />

      <NewsCarousel label="Science" passedArticles={articles.science} />
      <Divider />

      <NewsCarousel label="Sports" passedArticles={articles.sports} />
      <Divider />

      <NewsCarousel label="Technology" passedArticles={articles.technology} />
      <Divider />
    </Box>
  );
};

export default MainContent;
