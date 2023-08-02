import {
  CircularProgress,
  IconButton,
  Link,
  TextField,
  useTheme,
} from "@mui/material";
import React from "react";
import { Api } from "../../services/Api";
import { useAppSelector } from "../../state/hooks";
import { TrackObject } from "../../types/types";
import { NavLink } from "react-router-dom";
import { Clear } from "@mui/icons-material";

export default function Search() {
  const theme = useTheme();

  const token = useAppSelector((state) => state.auth.token);

  const [tracks, setTracks] = React.useState<TrackObject[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>("");

  const api = new Api();

  return (
    <div
      style={{
        padding: theme.spacing(3),
        display: "flex",
        flexDirection: "column",
      }}
    >
      <TextField
        fullWidth
        placeholder="Search..."
        value={value}
        InputProps={{
          endAdornment: (
            <IconButton
              onClick={() => {
                setValue("");
                setTracks([]);
              }}
            >
              <Clear />
            </IconButton>
          ),
        }}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setValue(event.target.value);

          if (event.target.value.length === 0) {
            setTracks([]);
            return;
          }

          (async () => {
            setLoading(true);
            const response = await api.getSearch(
              event.target.value,
              "track",
              token.access_token
            );

            setTracks(response.tracks.items);
            setLoading(false);
          })();
        }}
      />
      <br />
      {loading ? (
        <CircularProgress />
      ) : (
        tracks.map((t) => (
          <div key={t.id}>
            <Link component={NavLink} to={`/track/${t.id}`}>
              {t.name}
            </Link>
          </div>
        ))
      )}
    </div>
  );
}
