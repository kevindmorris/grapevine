import {
  Avatar,
  IconButton,
  List,
  ListItemAvatar,
  ListItemText,
  MenuItem,
} from "@mui/material";
import React from "react";
import { TrackObject } from "../../types/interfaces";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { addTrack, removeTrack } from "../../state/slices/savedSlice";
import {
  Favorite,
  FavoriteBorder,
  FavoriteOutlined,
} from "@mui/icons-material";

export default function TrackList({ tracks }: { tracks?: TrackObject[] }) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const savedTracks = useAppSelector((state) => state.saved.tracks);

  if (!tracks) return null;

  return (
    <List sx={{flex: 1}}>
      {tracks.map((track) => {
        const saved = savedTracks.some((t) => t.id === track.id);
        return (
          <MenuItem
            key={track.id}
            onClick={() => {
              navigate("/track/" + track.id);
            }}
          >
            <ListItemAvatar>
              <Avatar variant="square" src={track.album.images[0].url} />
            </ListItemAvatar>
            <ListItemText
              primary={track.name}
              primaryTypographyProps={{ noWrap: true }}
              secondary={track?.artists
                .map((artist, i) => artist.name)
                .join(", ")}
              secondaryTypographyProps={{ noWrap: true }}
            />
            <IconButton
              color={saved ? "primary" : "default"}
              onClick={(e) => {
                e.stopPropagation();
                saved
                  ? dispatch(removeTrack(track))
                  : dispatch(addTrack(track));
              }}
              sx={{ transition: "color 0.5s ease" }}
            >
              <Favorite />
            </IconButton>
          </MenuItem>
        );
      })}
    </List>
  );
}
