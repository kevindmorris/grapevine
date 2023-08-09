import {
  Avatar,
  Link,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Typography,
} from "@mui/material";
import { TrackObject } from "../../types/types";
import { useNavigate } from "react-router-dom";

export default function ListItemTrack({ track }: { track: TrackObject }) {
  const navigate = useNavigate();

  return (
    <MenuItem dense onClick={() => navigate(`/track/${track.id}`)}>
      <ListItemAvatar>
        <Avatar variant="square">
          <img
            src={track.album.images[2].url}
            alt=""
            style={{ width: "100%", height: "100%" }}
          />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={track.name}
        primaryTypographyProps={{ noWrap: true, maxWidth: 400 }}
        secondary={track.artists.map((artist) => artist.name).join(", ")}
        secondaryTypographyProps={{ noWrap: true, maxWidth: 400 }}
      />

      <Link
        variant="body2"
        color="text.secondary"
        width="50%"
        underline="hover"
        maxWidth={300}
        noWrap
      >
        {track.album.name}
      </Link>
      <Typography
        variant="body2"
        color="text.secondary"
        width={100}
        textAlign="right"
      >
        {msToMinAndSeconds(track.duration_ms)}
      </Typography>
    </MenuItem>
  );
}

function msToMinAndSeconds(ms: number) {
  var minutes = Math.floor(ms / 60000);
  var seconds = (ms % 60000) / 1000;
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds.toFixed(0);
}
