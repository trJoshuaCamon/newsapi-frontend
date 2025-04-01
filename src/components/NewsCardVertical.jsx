import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function NewsCardVertical({ article }) {
  const {
    title = "No Title",
    description = "No Description",
    urlToImage = null, // Allowing it to be null initially
    url = "#",
  } = article;

  const img_placeholder =
    "https://community.softr.io/uploads/db9110/original/2X/7/74e6e7e382d0ff5d7773ca9a87e6f6f8817a68a6.jpeg";

  const [imgSrc, setImgSrc] = React.useState(urlToImage);

  React.useEffect(() => {
    if (urlToImage) {
      setImgSrc(urlToImage);
    } else {
      setImgSrc(img_placeholder);
    }
  }, [urlToImage]);

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%", // Makes all cards the same height
        minHeight: "470px", // Sets a consistent base height
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        borderRadius: "12px",
        overflow: "hidden",
        minWidth: 275,
        maxWidth: { md: 400, lg: 290 },
        margin: "10px",
      }}
    >
      <CardMedia
        sx={{
          height: 140,
          overflow: "hidden",
          transition: "transform 0.1s ease-in-out",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
        image={imgSrc}
        onError={() => setImgSrc(img_placeholder)}
        title={title}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {(title && title.length > 100 ? `${title.slice(0, 80)}...` : title) ||
            "No Title"}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {(description && description.length > 190
            ? `${description.slice(0, 190)}...`
            : description) || "No Description"}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          // color="primary"
          // style={{ textTransform: "none" }}
          component="a"
          href={url}
          target="_blank"
        >
          Read More »
        </Button>
      </CardActions>
    </Card>
  );
}
