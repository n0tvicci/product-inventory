import { Typography, Box } from "@mui/material";
import React from "react";

export default function PageNotFound() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#F5F5F5",
      }}
    >
      <Typography variant="h1">404</Typography>
      <Typography variant="h6">Page Not Found</Typography>
      <p>The resource requested could not be found on this server!</p>
    </Box>
  );
}
