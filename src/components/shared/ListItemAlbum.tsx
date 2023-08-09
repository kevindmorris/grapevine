import React from "react";
import { AlbumObject } from "../../types/types";
import { Avatar, ListItemAvatar, ListItemText, MenuItem } from "@mui/material";

export default function ListItemAlbum({ album }: { album: AlbumObject }) {
  return (
    <MenuItem key={album.id} dense>
      <ListItemAvatar>
        <Avatar variant="square">
          <img
            src={album.images[2].url}
            alt=""
            style={{ width: "100%", height: "100%" }}
          />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={album.name}
        primaryTypographyProps={{ noWrap: true, maxWidth: 300 }}
        secondary={album.artists.map((artist) => artist.name).join(", ")}
        secondaryTypographyProps={{ noWrap: true, maxWidth: 300 }}
      />
    </MenuItem>
  );
}
