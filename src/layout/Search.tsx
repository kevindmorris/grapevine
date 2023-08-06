import {
  Autocomplete,
  Avatar,
  CircularProgress,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Paper,
  TextField,
  useTheme,
} from "@mui/material";
import React from "react";
import { Api } from "../services/Api";
import { useAppSelector } from "../state/hooks";
import { TrackObject } from "../types/types";
import { NavLink, useNavigate } from "react-router-dom";
import { Clear } from "@mui/icons-material";

export default function Search() {
  const theme = useTheme();

  const token = useAppSelector((state) => state.auth.token);

  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [options, setOptions] = React.useState<readonly TrackObject[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  const api = new Api();

  const navigate = useNavigate();

  return (
    <Autocomplete
      fullWidth
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option) => option.id}
      renderOption={(props, option, state) => (
        <MenuItem key={option.id} dense {...props}>
          <ListItemAvatar>
            <Avatar
              variant="square"
            >
              <img
                src={option.album.images[2].url}
                alt=""
                style={{ width: "100%", height: "100%" }}
              />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={option.name}
            secondary={option.artists.map((artist) => artist.name).join(", ")}
          />
        </MenuItem>
      )}
      open={inputValue.length > 2}
      onClose={() => setOptions([])}
      options={options}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);

        if (newInputValue.length === 0) {
          setOptions([]);
          return;
        }

        (async () => {
          setLoading(true);
          const response = await api.getSearch(
            newInputValue,
            "track",
            token.access_token
          );
          setLoading(false);

          setOptions(response.tracks.items);
        })();
      }}
      value={null}
      onChange={(event: any, newValue: TrackObject | null) => {
        setInputValue("");
        if (newValue) navigate(`/track/${newValue?.id}`);
      }}
      filterOptions={(x) => x}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search..."
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
