import { Home, Search } from "@mui/icons-material";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  useTheme,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const theme = useTheme();

  const navigate = useNavigate();

  return (
    <div
      style={{
        borderLeft: `1px solid ${theme.palette.divider}`,
        borderRight: `1px solid ${theme.palette.divider}`,
      }}
    >
      <List>
        <MenuItem
          onClick={() => navigate("/")}
          sx={{ transition: "all 0.5s ease" }}
        >
          <ListItemIcon>
            <Home sx={{ color: theme.palette.text.disabled }} />
          </ListItemIcon>
          <ListItemText
            primary="Home"
            primaryTypographyProps={{ color: theme.palette.text.disabled }}
          />
        </MenuItem>
        <MenuItem
          onClick={() => navigate("/search")}
          sx={{ transition: "all 0.5s ease" }}
        >
          <ListItemIcon>
            <Search sx={{ color: theme.palette.text.disabled }} />
          </ListItemIcon>
          <ListItemText
            primary="Search"
            primaryTypographyProps={{ color: theme.palette.text.disabled }}
          />
        </MenuItem>
      </List>
    </div>
  );
}
