import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
} from "@mui/material";

import CircularProgress from "@mui/material/CircularProgress";

// import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import BackButton from "./components/BackButton";

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
  const [content, setContent] = React.useState(null);
  const { article } = location.state || {}; // Safely access state

  useEffect(() => {
    // Fetch article content
    fetch(
      "http://localhost:5000/article?url=" + encodeURIComponent(article.url)
    )
      .then((res) => res.json())
      .then((data) => {
        const rawContent = data.content;

        // Clean up the fetched content
        const cleanContent = rawContent
          .replace(/\n+/g, "\n") // Collapse multiple newlines into one
          .replace(/^\s+|\s+$/g, "") // Trim leading and trailing whitespace
          .replace(/(\n\s*\n)+/g, "\n\n") // Remove multiple blank lines between paragraphs
          .replace(/\n/g, "\n\n"); // Ensure proper spacing between paragraphs

        setContent(cleanContent); // Update state with cleaned content
      })
      .catch((error) => console.error("Error fetching article:", error));
  }, [article.url]); // Only re-run when article.url changes

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

  fetch("http://localhost:5000/article?url=" + encodeURIComponent(article.url))
    .then((res) => res.json())
    .then((data) => console.log("Full Content:", data.content));

  if (!article) {
    // Check if article is null or undefined
    return (
      <Box {...stackProps}>
        <Typography variant="h6">Article not found</Typography>
      </Box>
    );
  }

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

  return (
    <Box {...stackProps}>
      <BackButton path="/" />
      <Grid container spacing={4}>
        {/* Left side: Image */}
        <Grid
          margin={"auto"}
          item
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
              image={article.urlToImage}
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

          {/* <Typography variant="body1" paragraph>
            {article.description}
          </Typography> */}

          <Typography
            variant="body2"
            sx={{
              whiteSpace: "pre-wrap",
              marginTop: "50px",
              textIndent: "3.5em",
            }}
          >
            {content}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ViewPost;
