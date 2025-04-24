// src/components/StockRow.js
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  ListItem,
  Tooltip,
  Fade,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
const CACHE_DURATION_MS = 15 * 60 * 1000; // Cache data for 15 minutes

const fetchStatus = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
};

// Helper function to check if a symbol looks like a stock ticker (basic check)
const isStockSymbol = (symbol) =>
  !symbol.includes("-") && !symbol.includes(":");

// --- LocalStorage Helper Functions ---
const getCachedData = (symbol) => {
  const cacheKey = `stockData_${symbol}`;
  try {
    const cachedItem = localStorage.getItem(cacheKey);
    if (!cachedItem) return null;

    const { timestamp, data } = JSON.parse(cachedItem);

    // Check if cache is expired
    if (Date.now() - timestamp > CACHE_DURATION_MS) {
      console.log(`Cache expired for ${symbol}`);
      localStorage.removeItem(cacheKey); // Remove expired item
      return null;
    }

    console.log(`Using cached data for ${symbol}`);
    return data; // Return the cached quote and profile data
  } catch (error) {
    console.error(`Error reading cache for ${symbol}:`, error);
    return null; // Return null if error or invalid format
  }
};

const setCachedData = (symbol, data) => {
  const cacheKey = `stockData_${symbol}`;
  try {
    const itemToCache = {
      timestamp: Date.now(), // Store current timestamp
      data: data, // Store the quote and profile data
    };
    localStorage.setItem(cacheKey, JSON.stringify(itemToCache));
  } catch (error) {
    console.error(`Error saving cache for ${symbol}:`, error);
    // Handle potential errors like storage full
  }
};
// --- End LocalStorage Helpers ---

function StockRow({ symbol }) {
  // Combined state for quote data and company profile
  const [stockData, setStockData] = useState({
    quote: null,
    profile: null,
  });
  const [status, setStatus] = useState(fetchStatus.IDLE);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    // --- Input Validation ---
    if (!symbol) {
      setErrorMsg("Symbol missing");
      setStatus(fetchStatus.ERROR);
      return;
    }

    let isMounted = true;

    const loadData = async () => {
      if (!isMounted) return;

      // --- Check Cache First ---
      const cachedData = getCachedData(symbol);
      if (cachedData) {
        setStockData(cachedData); // Use cached data
        setStatus(fetchStatus.SUCCESS);
        return; // Stop here if cache is valid
      }

      // --- If No Cache, Fetch from API ---
      setStatus(fetchStatus.LOADING);
      setErrorMsg("");
      setStockData({ quote: null, profile: null }); // Reset data while loading fresh

      try {
        // Prepare fetch promises
        const quotePromise = fetch(
          `${BACKEND_BASE_URL}/api/stocks/quote/${symbol}`
          // `${FINNHUB_BASE_URL}/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`
        );
        const profilePromise = isStockSymbol(symbol)
          ? fetch(
              `${BACKEND_BASE_URL}/api/stocks/profile/${symbol}`
              // `${FINNHUB_BASE_URL}/stock/profile2?symbol=${symbol}&token=${FINNHUB_API_KEY}`
            )
          : Promise.resolve(null);

        const [quoteResponse, profileResponse] = await Promise.all([
          quotePromise,
          profilePromise,
        ]);

        if (!isMounted) return;

        // Process Quote Response
        if (!quoteResponse.ok) {
          let errorText = `Quote HTTP ${quoteResponse.status}`;
          try {
            const data = await quoteResponse.json();
            errorText += `: ${data.error || "API error"}`;
          } catch (e) {
            console.log(e);
          }
          throw new Error(errorText);
        }
        const quoteData = await quoteResponse.json();
        if (
          quoteData.c == null ||
          quoteData.d == null ||
          quoteData.dp == null
        ) {
          throw new Error(`Incomplete essential quote data`);
        }
        if (
          quoteData.c === 0 &&
          quoteData.d === 0 &&
          quoteData.dp === 0 &&
          quoteData.o === 0 &&
          quoteData.pc === 0
        ) {
          throw new Error(`No quote data (may be invalid symbol)`);
        }

        // Process Profile Response
        let profileData = null;
        if (profileResponse) {
          if (profileResponse.ok) {
            profileData = await profileResponse.json();
            if (!profileData || Object.keys(profileData).length === 0) {
              profileData = null;
            }
          } else {
            // Log profile fetch error but don't block if quote succeeded
            console.warn(
              `Failed to fetch profile for ${symbol}: HTTP ${profileResponse.status}`
            );
          }
        }

        if (!isMounted) return;

        // Prepare data to update state and cache
        const freshData = {
          quote: {
            price: quoteData.c,
            change: quoteData.d,
            percentChange: quoteData.dp,
            open: quoteData.o,
            prevClose: quoteData.pc,
          },
          profile: profileData,
        };

        // Update State
        setStockData(freshData);
        setStatus(fetchStatus.SUCCESS);

        // --- Save Fresh Data to Cache ---
        setCachedData(symbol, freshData);
      } catch (err) {
        if (!isMounted) return;
        console.error(`Fetching data for ${symbol} failed:`, err);
        setErrorMsg(err.message || "Fetch failed");
        setStatus(fetchStatus.ERROR);
      }
    };

    loadData(); // Initial load (checks cache then fetches if needed)

    // Optional: Set up an interval for periodic refresh *ignoring cache*
    // This ensures data eventually updates even if the user keeps the tab open
    // Be mindful of API rate limits! Adjust interval accordingly.
    // const refreshInterval = setInterval(loadData, CACHE_DURATION_MS * 2); // e.g., Refresh every 30 mins

    return () => {
      isMounted = false;
      // clearInterval(refreshInterval); // Clear interval on unmount
    };
  }, [symbol]); // Re-run effect if symbol changes

  // --- Render Logic (no changes needed here) ---
  const renderContent = () => {
    switch (status) {
      case fetchStatus.LOADING:
        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "50px",
            }}
          >
            <CircularProgress size={20} color="inherit" />
          </Box>
        );

      case fetchStatus.ERROR:
        return (
          <Tooltip title={errorMsg} placement="top">
            <Typography
              variant="body2"
              color="error"
              sx={{
                fontStyle: "italic",
                width: "100%",
                textAlign: "center",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                px: 1,
              }}
            >
              {symbol}: Error
            </Typography>
          </Tooltip>
        );

      case fetchStatus.SUCCESS: {
        const { quote, profile } = stockData;
        if (!quote) return null; // Should have quote data if successful

        const companyName = profile?.name || symbol;
        const isPositive = quote.change >= 0;
        const changeColor = isPositive ? "success.light" : "error.light";
        const Icon = isPositive ? ArrowUpwardIcon : ArrowDownwardIcon;
        const changeStr = `${isPositive ? "+" : ""}${quote.change?.toFixed(2)}`;
        const pctChangeStr = `(${
          isPositive ? "+" : ""
        }${quote.percentChange?.toFixed(2)}%)`;

        return (
          <Fade in={true}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                width: "100%",
              }}
            >
              {/* Left Section */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 1,
                  minWidth: 0,
                  flexGrow: 1,
                  pr: 1,
                  pt: 0.5,
                }}
              >
                <Icon
                  sx={{
                    color: changeColor,
                    fontSize: "1.2rem",
                    flexShrink: 0,
                    mt: 0.2,
                  }}
                />
                <Box
                  sx={{ display: "flex", flexDirection: "column", minWidth: 0 }}
                >
                  <Tooltip
                    title={`${companyName} ${pctChangeStr}`}
                    placement="top-start"
                  >
                    <Typography
                      variant="body1"
                      noWrap
                      sx={{
                        fontWeight: "medium",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        lineHeight: 1.3,
                      }}
                    >
                      {symbol}
                    </Typography>
                  </Tooltip>
                  {profile && profile.name && profile.name !== symbol && (
                    <Typography
                      variant="caption"
                      noWrap
                      sx={{
                        color: "text.secondary",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        lineHeight: 1.2,
                      }}
                    >
                      {profile.name}
                    </Typography>
                  )}
                  {!isStockSymbol(symbol) && (
                    <Typography
                      variant="caption"
                      noWrap
                      sx={{
                        color: "text.secondary",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        lineHeight: 1.2,
                      }}
                    >
                      {symbol.split("-")[0]}
                    </Typography>
                  )}
                </Box>
              </Box>
              {/* Right Section */}
              <Box sx={{ textAlign: "right", flexShrink: 0, pl: 1, pt: 0.5 }}>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: "medium", lineHeight: 1.3 }}
                >
                  {quote.price?.toFixed(2)}
                </Typography>
                <Box
                  sx={{ display: "flex", gap: 0.5, justifyContent: "flex-end" }}
                >
                  <Typography
                    variant="body2"
                    sx={{ color: changeColor, lineHeight: 1.2 }}
                  >
                    {changeStr}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: changeColor, lineHeight: 1.2 }}
                  >
                    {pctChangeStr}
                  </Typography>
                </Box>
                <Box sx={{ mt: 0.5 }}>
                  {quote.open != null && (
                    <Typography
                      variant="caption"
                      sx={{ color: "text.secondary", lineHeight: 1.2 }}
                    >
                      O: {quote.open.toFixed(2)}
                    </Typography>
                  )}
                  {quote.prevClose != null && (
                    <Typography
                      variant="caption"
                      sx={{
                        color: "text.secondary",
                        ml: quote.open != null ? 0.5 : 0,
                        lineHeight: 1.2,
                      }}
                    >
                      PC: {quote.prevClose.toFixed(2)}
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>
          </Fade>
        );
      }

      default:
        return <Box sx={{ width: "100%", height: "50px" }} />;
    }
  };

  // --- Component Return ---
  return (
    <ListItem
      disablePadding
      sx={{ px: 1.5, minHeight: "70px", display: "flex", alignItems: "center" }}
    >
      {renderContent()}
    </ListItem>
  );
}

export default StockRow; // Assuming the filename is still StockRow.js as per user input
