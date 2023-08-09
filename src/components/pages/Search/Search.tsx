import {
  Autocomplete,
  Avatar,
  Chip,
  CircularProgress,
  Link,
  List,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { Api } from "../../../services/Api";
import { useAppSelector } from "../../../state/hooks";
import { AlbumObject, ArtistObject, TrackObject } from "../../../types/types";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const theme = useTheme();

  const token = useAppSelector((state) => state.auth.token);

  const [value, setValue] = React.useState("");
  const [searchType, setSearchType] = React.useState("tracks");
  const [loadingTracks, setLoadingTracks] = React.useState<boolean>(false);
  const [tracks, setTracks] = React.useState<TrackObject[]>([]);
  const [loadingAlbums, setLoadingAlbums] = React.useState<boolean>(false);
  const [albums, setAlbums] = React.useState<AlbumObject[]>([]);
  const [loadingArtists, setLoadingArtists] = React.useState<boolean>(false);
  const [artists, setArtists] = React.useState<ArtistObject[]>([]);

  const api = new Api();

  const navigate = useNavigate();

  return (
    <div>
      <TextField
        value={value}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setValue(event.target.value);

          if (event.target.value.length < 1) {
            return;
          }

          (async () => {
            setLoadingTracks(true);
            const response = await api.getSearch(
              event.target.value,
              "track",
              token.access_token,
              10
            );
            setLoadingTracks(false);

            if (response.tracks) setTracks(response.tracks.items);
          })();
          (async () => {
            setLoadingAlbums(true);
            const response = await api.getSearch(
              event.target.value,
              "album",
              token.access_token,
              10
            );
            setLoadingAlbums(false);

            if (response.albums) setAlbums(response.albums.items);
          })();
          (async () => {
            setLoadingArtists(true);
            const response = await api.getSearch(
              event.target.value,
              "artist",
              token.access_token,
              10
            );
            setLoadingArtists(false);

            if (response.artists) setArtists(response.artists.items);
          })();
        }}
        placeholder="Search..."
        fullWidth
        sx={{ my: theme.spacing(2) }}
      />
      <Stack direction="row" spacing={1}>
        <Chip
          label="Tracks"
          color={searchType === "tracks" ? "primary" : undefined}
          onClick={() => {
            setSearchType("tracks");
          }}
          sx={{ width: "max-content" }}
        />
        <Chip
          label="Albums"
          color={searchType === "albums" ? "primary" : undefined}
          onClick={() => {
            setSearchType("albums");
          }}
          sx={{ width: "max-content" }}
        />
        <Chip
          label="Artists"
          color={searchType === "artists" ? "primary" : undefined}
          onClick={() => {
            setSearchType("artists");
          }}
          sx={{ width: "max-content" }}
        />
      </Stack>
      {searchType == "tracks" ? (
        <SearchTracks tracks={tracks} loading={loadingTracks} />
      ) : null}
      {searchType == "albums" ? (
        <SearchAlbums albums={albums} loading={loadingAlbums} />
      ) : null}
      {searchType == "artists" ? (
        <SearchArtists artists={artists} loading={loadingArtists} />
      ) : null}
    </div>
  );
}

function SearchTracks({
  tracks,
  loading,
}: {
  tracks: TrackObject[];
  loading: boolean;
}) {
  return (
    <div>
      <List>
        {tracks.map((track) => (
          <MenuItem key={track.id} dense>
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
            <Typography variant="body2" color="text.secondary" width={100} textAlign="right">
              {msToMinAndSeconds(track.duration_ms)}
            </Typography>
          </MenuItem>
        ))}
      </List>
    </div>
  );
}
function msToMinAndSeconds(ms: number) {
  var minutes = Math.floor(ms / 60000);
  var seconds = (ms % 60000) / 1000;
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds.toFixed(0);
}

function SearchAlbums({
  albums,
  loading,
}: {
  albums: AlbumObject[];
  loading: boolean;
}) {
  const theme = useTheme();

  return (
    <div>
      <List>
        {albums.map((album) => (
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
        ))}
      </List>
    </div>
  );
}
function SearchArtists({
  artists,
  loading,
}: {
  artists: ArtistObject[];
  loading: boolean;
}) {
  const theme = useTheme();

  return (
    <div>
      <List>
        {artists.map((artist) => (
          <MenuItem key={artist.id} dense>
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
        ))}
      </List>
    </div>
  );
}
