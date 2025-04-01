import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";

function NewsCardHorizontal({ article }) {
  const {
    title = "No Title",
    description = "No Description",
    urlToImage = null, // Allowing it to be null initially
    url = "#",
  } = article;
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  const img_placeholder =
    "https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=170667a&w=0&k=20&c=Q7gLG-xfScdlTlPGFohllqpNqpxsU1jy8feD_fob87U=";

  // Set a fallback image URL if urlToImage is invalid or null
  const [imgSrc, setImgSrc] = React.useState(urlToImage || img_placeholder);

  // Handle image error (CORS or other issues)
  const handleImageError = (event) => {
    // Check if the error was due to a CORS issue (by checking the event)
    if (event.target.naturalWidth === 0) {
      // The image failed to load (likely due to CORS), so use fallback image
      setImgSrc(img_placeholder);
    }
  };

  React.useEffect(() => {
    if (!urlToImage) {
      setImgSrc(img_placeholder);
    } else {
      setImgSrc(urlToImage);
    }
  }, [urlToImage]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // minHeight: "100vh",
        backgroundColor: theme.palette.background.default,
        marginBlock: "40px",
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: "1220px",
          display: "grid",
          gridTemplateColumns: isMediumScreen ? "1fr" : "1fr 1fr",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "16px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            overflow: "hidden", // Prevents the image from exceeding the container when scaled
            transition: "transform 0.1s ease-in-out", // Smooth transition effect
          }}
        >
          <CardMedia
            component="img"
            image={imgSrc || img_placeholder}
            alt={title}
            style={{
              height: isMediumScreen ? "300px" : "100%",
              objectFit: "cover",
              transition: "transform 0.3s ease-in-out", // Image transition effect
            }}
            onError={handleImageError} // Handle image load error
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.1)")
            } // Scale up on hover
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")} // Return to normal size
            crossOrigin="anonymous"
          />
        </div>
        <CardContent style={{ padding: "24px" }}>
          <Typography
            variant="h4"
            style={{
              color:
                theme.palette.mode === "dark"
                  ? "#ffffff"
                  : theme.palette.primary.main,
              marginBottom: "16px",
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body1"
            style={{
              color: theme.palette.mode === "dark" ? "#ffffff" : "#374151",
              marginBottom: "16px",
            }}
          >
            {description}
          </Typography>
          <Button
            color="primary"
            style={{ textTransform: "none" }}
            component="a"
            href={url}
            target="_blank"
          >
            Read More »
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default NewsCardHorizontal;
