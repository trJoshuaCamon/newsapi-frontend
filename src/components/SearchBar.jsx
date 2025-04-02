import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

const SearchContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  borderRadius: "100px",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  padding: theme.spacing(0.5, 1),
  width: "100%",
  maxWidth: "400px",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  flex: 1,
  "& .MuiInputBase-input": {
    padding: theme.spacing(1),
  },
}));

export default function SearchBar() {
  return (
    <Box sx={{ width: { xs: "200px", sm: "250px", md: "300px", lg: "400px" } }}>
      <SearchContainer>
        <StyledInputBase
          placeholder="Search News..."
          inputProps={{ "aria-label": "search" }}
        />
        <IconButton
          onClick={() => alert("Search icon clicked!")}
          sx={{ color: "white" }}
        >
          <SearchIcon />
        </IconButton>
      </SearchContainer>
    </Box>
  );
}
