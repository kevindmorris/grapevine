import { Typography, useTheme } from "@mui/material";
import { TrackObject } from "../../../types/types";

export default function TrackInformation({ track }: { track?: TrackObject }) {
  const theme = useTheme();

  return (
    <div style={{ flex: 2, display: "flex", gap: theme.spacing(2) }}>
      <img src={track?.album.images[1].url} alt="" style={{ height: "100%" }} />
      <div>
        <Typography variant="h6">{track?.name}</Typography>
        <Typography>{track?.artists.map((a) => a.name).join(", ")}</Typography>
        <Typography>{track?.album.name}</Typography>
      </div>
    </div>
  );
}
