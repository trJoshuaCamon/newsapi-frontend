import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useParams, useLocation } from "react-router-dom";
import BackButton from "./components/BackButton";

const stackProps = {
  direction: { xs: "column", md: "row" },
  spacing: 0,
  sx: { marginBottom: { xs: "15px", md: "20px", lg: "30px" } },
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "center",
};

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
const img_placeholder =
  "https://community.softr.io/uploads/db9110/original/2X/7/74e6e7e382d0ff5d7773ca9a87e6f6f8817a68a6.jpeg";

const STORAGE_NAME = "news_articles";
const FULL_ARTICLE_STORAGE = "full_articles"; // <-- NEW Storage for full articles

// Custom hook to handle fetching article content and caching
const useFetchArticleContent = (url) => {
  const [content, setContent] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  useEffect(() => {
    if (!url) return;

    const fullArticleCache = JSON.parse(
      localStorage.getItem(FULL_ARTICLE_STORAGE) || "{}"
    );
    const cachedContent = fullArticleCache[url];

    if (cachedContent) {
      setContent(cachedContent);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(false);

    fetch(`${BACKEND_BASE_URL}/api/article?url=${encodeURIComponent(url)}`)
      .then((res) => res.json())
      .then((data) => {
        const rawContent = data.content;
        if (!rawContent) {
          setError(true);
          return;
        }

        const cleanContent = rawContent
          .replace(/\n+/g, "\n")
          .replace(/^\s+|\s+$/g, "")
          .replace(/(\n\s*\n)+/g, "\n\n")
          .replace(/\n/g, "\n\n");

        setContent(cleanContent);

        // Save to localStorage cache
        const updatedCache = {
          ...fullArticleCache,
          [url]: cleanContent,
        };
        localStorage.setItem(
          FULL_ARTICLE_STORAGE,
          JSON.stringify(updatedCache)
        );
      })
      .catch((error) => {
        console.error("Error fetching article:", error);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url]);

  return { content, loading, error };
};

const ViewPost = () => {
  const location = useLocation();
  const { id, category } = useParams();
  const [moreContents, setMoreContents] = React.useState([]);
  const [visibleCount, setVisibleCount] = React.useState(2); // 👈 Start by showing 2 extra articles

  const [article, setArticle] = React.useState(location.state?.article || null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch more articles for sidebar
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem(STORAGE_NAME));
    if (storedData && storedData[category]) {
      const allArticles = storedData[category].filter(
        (item) => item.articleID !== id
      );
      setMoreContents(allArticles);
    }
  }, [category, id]);

  // Fetch main article content if not passed from the location state
  useEffect(() => {
    if (!article) {
      const storedData = JSON.parse(localStorage.getItem(STORAGE_NAME));
      if (storedData && storedData[category] && id) {
        const foundArticle = storedData[category].find(
          (item) => item.articleID === id
        );
        setArticle(foundArticle);
      }
    }
  }, [category, id, article]);

  // Handle scroll for lazy load
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100
      ) {
        // Near bottom
        setVisibleCount((prev) => prev + 2); // 👈 Load 2 more articles
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!article) {
    return (
      <Box {...stackProps}>
        <Typography variant="h6">Article not found</Typography>
      </Box>
    );
  }

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

  return (
    <>
      <Box {...stackProps}>
        <BackButton path="/" />
        <Grid container spacing={4}>
          {/* Left side: Image */}
          <Grid
            margin={"auto"}
            sx={{
              width: "100%",
              maxWidth: { xs: "100%", md: "80%" },
            }}
          >
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardMedia
                component="img"
                image={article.urlToImage || img_placeholder}
                alt={article.title}
                sx={{
                  objectFit: "contain",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              />
            </Card>
          </Grid>

          {/* Right side: Text content */}
          <Grid>
            <Typography variant="h3" gutterBottom>
              {article.title}
            </Typography>

            <Typography variant="h6" color="text.secondary" gutterBottom>
              By {article.author || "Unknown Author"} | Published on{" "}
              {formattedDate}
            </Typography>

            <Typography variant="body2" color="text.secondary" gutterBottom>
              Source: &nbsp;
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                {article.source.name}
              </a>
            </Typography>

            <Box sx={{ marginTop: "50px" }}>
              {/* Load main article */}
              <ArticleContent url={article.url} />
            </Box>
          </Grid>
        </Grid>

        {/* Add divider with proper margin */}
        <Box
          sx={{
            marginTop: { xs: "15px", md: "20px", lg: "30px" },
            marginBottom: { xs: "15px", md: "20px", lg: "30px" },
            borderBottom: 1,
            borderColor: "divider",
          }}
        />
      </Box>

      {/* -------------- next articles ------------ */}
      {moreContents.slice(0, visibleCount).map((article, index) => (
        <Box key={index} {...stackProps}>
          <BackButton path="/" />
          <Grid container spacing={4}>
            {/* Left side: Image */}
            <Grid
              margin={"auto"}
              sx={{
                width: "100%",
                maxWidth: { xs: "100%", md: "80%" },
              }}
            >
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="img"
                  image={article.urlToImage || img_placeholder}
                  alt={article.title}
                  sx={{
                    objectFit: "contain", // Ensures the whole image is visible without cropping
                    width: "100%", // Makes the image take full width
                    height: "100%", // Makes the image take full height of the container
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                />
              </Card>
            </Grid>

            {/* Right side: Text content */}
            <Grid>
              <Typography variant="h3" gutterBottom>
                {article.title}
              </Typography>

              <Typography variant="h6" color="text.secondary" gutterBottom>
                By {article.author || "Unknown Author"} | Published on{" "}
                {formattedDate}
              </Typography>

              <Typography variant="body2" color="text.secondary" gutterBottom>
                Source: &nbsp;
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  {article.source.name}
                </a>
              </Typography>

              <Box sx={{ marginTop: "50px" }}>
                {/* Load more articles */}
                <ArticleContent url={article.url} />
              </Box>
            </Grid>
          </Grid>

          {/* ADD divider with proper margin */}
          <Box
            sx={{
              marginTop: "30px",
              marginBottom: "30px",
              borderBottom: 2,
              borderColor: "divider",
            }}
          />
        </Box>
      ))}
    </>
  );
};

const ArticleContent = ({ url }) => {
  const { content, loading, error } = useFetchArticleContent(url);

  return (
    <Box sx={{ marginTop: "50px" }}>
      {loading ? (
        <CircularProgress sx={{ display: "block", margin: "0 auto" }} />
      ) : content ? (
        <Typography
          variant="body2"
          sx={{
            whiteSpace: "pre-wrap",
            textIndent: "3.5em",
          }}
        >
          {content}
        </Typography>
      ) : (
        <Typography variant="body2" color="text.secondary">
          {error
            ? "Failed to load article content."
            : "No description available."}
        </Typography>
      )}
    </Box>
  );
};

export default ViewPost;
