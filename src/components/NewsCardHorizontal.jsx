import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";

function NewsCardHorizantal() {
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f3f4f6",
      }}
    >
      <Card
        style={{
          maxWidth: "900px",
          width: "100%",
          display: "grid",
          gridTemplateColumns: isMediumScreen ? "1fr" : "1fr 1fr",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          borderRadius: "16px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#e5e7eb",
            height: isMediumScreen ? "300px" : "100%",
          }}
        >
          <div style={{ fontSize: "64px", color: "#9ca3af" }}>No Image</div>
        </div>
        <CardContent style={{ padding: "24px" }}>
          <Typography
            variant="h4"
            style={{ color: "#7c3aed", marginBottom: "16px" }}
          >
            Survey finds a majority of Americans now disapprove of the job
            President Trump is doing
          </Typography>
          <Typography
            variant="body1"
            style={{ color: "#374151", marginBottom: "16px" }}
          >
            The Yahoo News/YouGov survey shows the president's approval rating
            has fallen amid perceptions that he isn't prioritizing America's
            most important issues.
          </Typography>
          <Button color="primary" style={{ textTransform: "none" }}>
            Read More »
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default NewsCardHorizantal;
