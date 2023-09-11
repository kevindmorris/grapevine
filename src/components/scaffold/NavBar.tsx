import { Favorite, Launch, Reorder } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  MenuItem,
  Toolbar,
  useTheme,
} from "@mui/material";
import React from "react";
import SearchBar from "./SearchBar";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { removeTrack } from "../../state/slices/savedSlice";
import SavedDrawer from "./SavedDrawer";

export default function NavBar() {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        borderStyle: "solid",
        borderColor: "divider",
        borderWidth: "0px 0px thin",
        backgroundColor: "background.paper",
        color: "text.primary",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar
        variant="dense"
        disableGutters
        sx={{ minHeight: 45, height: 45, alignItems: "center", p: theme.spacing(0.5) }}
      >
        <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
          <img
            src="/grapevine-logo.png"
            alt="grapevine"
            onClick={() => navigate("/")}
            style={{ height: 35, cursor: "pointer" }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
          <SearchBar />
        </div>
        <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
          <SavedDrawer />
        </div>
      </Toolbar>
    </AppBar>
  );
}
