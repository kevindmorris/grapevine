import { Chip, Stack, TextField, useTheme } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../../state/hooks";
import SearchTracks from "./SearchTracks";
import SearchAlbums from "./SearchAlbums";
import SearchArtists from "./SearchArtists";

export default function Search() {
  const theme = useTheme();

  const token = useAppSelector((state) => state.auth.token);

  const [value, setValue] = React.useState("");
  const [searchType, setSearchType] = React.useState("tracks");

  return (
    <div>
      <TextField
        value={value}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setValue(event.target.value);
        }}
        placeholder="Search..."
        fullWidth
        spellCheck={false}
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
      {searchType == "tracks" ? <SearchTracks value={value} /> : null}
      {searchType == "albums" ? <SearchAlbums value={value} /> : null}
      {searchType == "artists" ? <SearchArtists value={value} /> : null}
    </div>
  );
}
