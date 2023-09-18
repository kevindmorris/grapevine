import { Favorite, Launch, QueueMusic, Reorder } from "@mui/icons-material";
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
  Tooltip,
  useTheme,
} from "@mui/material";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";
import SavedDrawer from "./SavedDrawer";
import ControlsDrawer from "./ControlsDrawer";

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
        sx={{
          minHeight: 45,
          height: 45,
          alignItems: "center",
          p: theme.spacing(0.5),
        }}
      >
        <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
          <img
            src="/grapevine-logo.png"
            alt="grapevine"
            onClick={() => navigate("/")}
            style={{ height: 35, cursor: "pointer" }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", flex: 2 }}>
          <SearchBar />
        </div>
        <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
          <Tooltip title="Open Recommendations Page">
            <IconButton
              size="small"
              onClick={() => navigate("/recommendations")}
            >
              <QueueMusic />
            </IconButton>
          </Tooltip>
          <ControlsDrawer />
          <SavedDrawer />
        </div>
      </Toolbar>
    </AppBar>
  );
}
