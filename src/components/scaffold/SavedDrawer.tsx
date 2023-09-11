import { Clear, Favorite, Launch, Reorder } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  MenuItem,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import SearchBar from "./SearchBar";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { removeTrack } from "../../state/slices/savedSlice";
import TrackList from "../shared/TrackList";

const DRAWER_WIDTH = 450;
export default function SavedDrawer() {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const tracks = useAppSelector((state) => state.saved.tracks);
  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <>
      <IconButton size="small" onClick={() => setOpen(true)}>
        <Reorder />
      </IconButton>
      <Drawer
        variant="temporary"
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          [`& .MuiDrawer-paper`]: { width: DRAWER_WIDTH },
        }}
      >
        <Box
          sx={{
            height: 45,
            pl: 1,
            pr: 0.5,
            py: 0.5,
            display: "flex",
          }}
        >
          <Typography fontWeight="bold" mt="auto" mr="auto">
            Saved Items
          </Typography>
          <IconButton
            size="small"
            onClick={() => {
              setOpen(false);
              navigate("/recommendations");
            }}
          >
            <Launch />
          </IconButton>
          <IconButton size="small" onClick={() => setOpen(false)}>
            <Clear />
          </IconButton>
        </Box>
        <Divider />
        {tracks.length === 0 ? (
          <Box sx={{ p: 1 }}>
            <Typography fontStyle="italic">No saved tracks.</Typography>
          </Box>
        ) : (
          <TrackList tracks={tracks} />
        )}
      </Drawer>
    </>
  );
}
