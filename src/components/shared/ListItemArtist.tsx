import React from "react";
import { ArtistObject } from "../../types/types";
import { Avatar, ListItemAvatar, ListItemText, MenuItem } from "@mui/material";

export default function ListItemArtist({ artist }: { artist: ArtistObject }) {
  return (
    <MenuItem dense>
      <ListItemAvatar>
        <Avatar variant="square">
          <img
            src={artist.images[2]?.url}
            alt=""
            style={{ width: "100%", height: "100%" }}
          />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={artist.name}
        primaryTypographyProps={{ noWrap: true }}
      />
    </MenuItem>
  );
}
