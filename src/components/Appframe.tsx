import { Box, Paper } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./scaffold/NavBar";

export default function Appframe() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        flex: "1 1 0",
        display: "flex",
        overflow: "hidden",
        paddingTop: "55px",
        pb: 2,
      }}
    >
      <NavBar />
      <Outlet />
    </Box>
  );
}
