import React from "react";
import Search from "./Search";
import Router from "./Router";
import { Container, Link, useTheme } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function Appframe() {
  const theme = useTheme();

  return (
    <Container
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ padding: `${theme.spacing(3)} 0` }}>
        <Search />
      </div>

      <div style={{ flex: 1 }}>
        <Router />
      </div>

      <div style={{ display: "flex" }}>
        <Link component={NavLink} to="/">
          Garpevine
        </Link>
      </div>
    </Container>
  );
}
