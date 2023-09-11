import { Paper } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

export default function Appframe() {
  return (
    <div style={{ display: "flex" }}>
      <Paper
        sx={{
          flex: "1 1 0",
          minHeight: "100vh",
          display: "flex",
          overflowX: "hidden",
        }}
      >
        <Outlet />
      </Paper>
    </div>
  );
}
