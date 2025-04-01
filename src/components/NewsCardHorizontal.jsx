import React, { useState } from "react";
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
    urlToImage = "https://community.softr.io/uploads/db9110/original/2X/7/74e6e7e382d0ff5d7773ca9a87e6f6f8817a68a6.jpeg",
    url,
  } = article;
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [imgSrc, setImgSrc] = useState(urlToImage);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // minHeight: "100vh",
        backgroundColor: "#f3f4f6",
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
            image={imgSrc}
            alt={title}
            style={{
              height: isMediumScreen ? "300px" : "100%",
              objectFit: "cover",
              transition: "transform 0.3s ease-in-out", // Image transition effect
            }}
            onError={() =>
              setImgSrc(
                "https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=170667a&w=0&k=20&c=Q7gLG-xfScdlTlPGFohllqpNqpxsU1jy8feD_fob87U="
              )
            } // Fallback image
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.1)")
            } // Scale up on hover
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")} // Return to normal size
          />
        </div>
        <CardContent style={{ padding: "24px" }}>
          <Typography
            variant="h4"
            style={{ color: "#7c3aed", marginBottom: "16px" }}
          >
            {title}
          </Typography>
          <Typography
            variant="body1"
            style={{ color: "#374151", marginBottom: "16px" }}
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
