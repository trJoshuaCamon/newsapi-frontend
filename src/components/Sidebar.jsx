import React from "react";
import { Box, Typography, Button } from "@mui/material";

const Sidebar = () => {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Sidebar
      </Typography>

      <Typography variant="body2" paragraph>
        Add widgets, filters, or other interactive content here.
      </Typography>

      <Button variant="contained" color="primary">
        Example Button
      </Button>
    </Box>
  );
};

export default Sidebar;
