import { useState, useEffect, useRef } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Container, Paper, Typography, Box } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ViewPost from "./ViewPost";
import FullPageLoading from "./components/FullPageLoading";

import Navbar from "./components/Navbar";

import "./App.css";
import MainContent from "./components/MainContent";
import Sidebar from "./components/Sidebar";
import { Category } from "@mui/icons-material";

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

const COOKIE_NAME = "news_articles";
const COOKIE_EXPIRATION_MINUTES = 10;

export default function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [themeMode, setThemeMode] = useState(() => {
    const storedTheme = localStorage.getItem("themeMode");
    return storedTheme ? JSON.parse(storedTheme) : prefersDarkMode;
  });
  const hasFetched = useRef(false); // Track whether API call has run
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
    if (hasFetched.current) return; // Prevents running twice in Strict Mode
    hasFetched.current = true;

    const fetchData = async () => {
      try {
        const storedData = JSON.parse(localStorage.getItem(COOKIE_NAME));
        if (storedData) {
          setArticles(storedData); // Directly parse and set state
          console.log("Data found in localStorage:", storedData);
          setLoading(false);

          return; // Stop execution if data is found in localStorage
        }

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

        // Add IDs to articles
        const addIdsToArticles = (articles, category) => {
          return articles.map((article, index) => ({
            ...article,
            articleID: `${index + 1}`, // Unique ID within the category
            category: category, // Explicitly set the category
          }));
        };

        const fetchedArticles = {
          topHeadlines: addIdsToArticles(
            dataTopHeadlines.articles,
            "topHeadlines"
          ),
          business: addIdsToArticles(dataBusiness.articles, "business"),
          entertainment: addIdsToArticles(
            dataEntertainment.articles,
            "entertainment"
          ),
          general: addIdsToArticles(dataGeneral.articles, "general"),
          health: addIdsToArticles(dataHealth.articles, "health"),
          science: addIdsToArticles(dataScience.articles, "science"),
          sports: addIdsToArticles(dataSports.articles, "sports"),
          technology: addIdsToArticles(dataTechnology.articles, "technology"),
        };

        localStorage.setItem(COOKIE_NAME, JSON.stringify(fetchedArticles));
        console.log("Data saved to localStorage:", fetchedArticles);

        // Set the articles with IDs for each category
        setArticles(fetchedArticles);

        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem("themeMode", JSON.stringify(themeMode));
  }, [themeMode]);

  const appTheme = createTheme({
    palette: {
      mode: themeMode ? "dark" : "light",
    },
  });

  function handleThemeMode() {
    setThemeMode(!themeMode);
  }

  const isMdScreen = useMediaQuery("(max-width:960px)");

  if (loading) {
    return <FullPageLoading />; // Uniform loading state
  }

  if (error) {
    return <Typography variant="h6">Error: {error}</Typography>; // More friendly error display
  }

  {
    console.log(articles);
  }

  const allArticles = {
    topHeadlines: articles.topHeadlines,
    business: articles.business,
    entertainment: articles.entertainment,
    general: articles.general,
    health: articles.health,
    science: articles.science,
    sports: articles.sports,
    technology: articles.technology,
  };

  return (
    <Router>
      <ThemeProvider theme={appTheme}>
        <Paper
          elevation={0}
          square
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh", // Removed fixed height
          }}
        >
          <Navbar themeMode={themeMode} handleThemeMode={handleThemeMode} />

          <Box
            sx={{
              display: "flex",
              flexDirection: isMdScreen ? "column-reverse" : "row",
              flex: 1,
              overflow: "hidden",
            }}
          >
            {/* Main Content */}
            <Box
              sx={{
                flex: isMdScreen ? 1 : 4,
                overflowY: "auto",
                padding: "20px",
                bgcolor: "background.default",
              }}
            >
              <Routes>
                <Route
                  path="/"
                  element={<MainContent allArticles={allArticles} />}
                />
                <Route path="/article/:category/:id" element={<ViewPost />} />
                <Route
                  path="/article/search/:articleTitleSearch"
                  element={<ViewPost />}
                />

                {/* <Route path="*" element={<MainContent />} /> */}
                {/* <Route path="/new" element={<NewPage />} /> */}
                {/* Add other routes here */}
              </Routes>
            </Box>

            {/* Sidebar */}
            <Box
              sx={{
                flex: 1, // Ensures sidebar takes up full width on medium screens
                minWidth: "300px",
                minHeight: isMdScreen ? "auto" : "100vh", // Prevents shrinking
                overflowY: "auto",
                padding: "20px",
                backgroundColor: themeMode ? "#252525" : "#eeeeee",
              }}
            >
              <Sidebar allArticles={allArticles} />
            </Box>
          </Box>
        </Paper>
      </ThemeProvider>
    </Router>
  );
}
