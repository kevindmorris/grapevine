import { Paper } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./scaffold/NavBar";

export default function Appframe() {
  return (
    <Paper
      sx={{
        flex: "1 1 0",
        minHeight: "100vh",
        height: "100vh",
        display: "flex",
        overflow: "hidden",
        paddingTop: "55px",
        pb: 2,
      }}
    >
      <NavBar />
      <Outlet />
    </Paper>
  );
}
