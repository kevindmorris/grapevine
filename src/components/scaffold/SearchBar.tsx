import * as React from "react";
import { useTheme, styled } from "@mui/material/styles";
import Popper from "@mui/material/Popper";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import Autocomplete, {
  AutocompleteCloseReason,
  autocompleteClasses,
} from "@mui/material/Autocomplete";
import ButtonBase from "@mui/material/ButtonBase";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import {
  Avatar,
  Backdrop,
  Chip,
  Input,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Modal,
  OutlinedInput,
  Paper,
  Stack,
  Typography,
  debounce,
} from "@mui/material";
import { Api } from "../../services/Api";
import { useAppSelector } from "../../state/hooks";
import {
  AlbumObject,
  ArtistObject,
  SearchObject,
  TrackObject,
} from "../../types/interfaces";
import { useNavigate } from "react-router-dom";

const StyledAutocompletePopper = styled("div")(({ theme }) => ({
  width: "100%",
  [`& .${autocompleteClasses.paper}`]: {
    boxShadow: "none",
    margin: 0,
    color: "inherit",
    fontSize: 13,
    width: "100%",
  },
}));

const StyledInput = styled(InputBase)(({ theme }) => ({
  borderRadius: 4,
  padding: theme.spacing(0.5, 2),
  border: `1px solid ${theme.palette.divider}`,
  fontSize: 14,
  transition: "all 0.5s ease",
  [`&:hover`]: {
    backgroundColor: theme.palette.action.hover,
  },
  [`&:focus-within`]: {
    backgroundColor: theme.palette.action.hover,
  },
}));

export default function SearchBar() {
  const navigate = useNavigate();

  const token = useAppSelector((state) => state.auth.token);

  const [open, setOpen] = React.useState<boolean>(true);
  const [q, setQ] = React.useState<string>("");
  const [type, setType] = React.useState<string>("track");
  const [results, setResults] = React.useState<
    Array<TrackObject | ArtistObject | AlbumObject>
  >([]);

  const api = new Api();

  const fetchResults = React.useCallback(
    async (newValue: string) => {
      if (newValue.trim().length === 0) return;
      const response: SearchObject = await api.getSearch({
        q: newValue,
        type: type,
        access_token: token.access_token,
        limit: 10,
      });
      if (type === "track") setResults(response.tracks?.items || []);
      if (type === "artist") setResults(response.artists?.items || []);
      if (type === "album") setResults(response.albums?.items || []);
    },
    [type]
  );

  const debouncedSearch = React.useMemo(
    () =>
      debounce((newValue) => {
        fetchResults(newValue);
      }, 1000),
    [token, type]
  );

  React.useEffect(() => {
    debouncedSearch(q);
  }, [type]);

  return (
    <Autocomplete
      fullWidth
      open={open && q !== ""}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      options={results}
      getOptionLabel={(option) => option.id}
      renderOption={(props, option: any) => {
        if (option.type === "track") {
          return (
            <MenuItem {...props}>
              <ListItemAvatar>
                <Avatar variant="square" src={option.album.images[0].url} />
              </ListItemAvatar>
              <ListItemText
                primary={option.name}
                secondary={option.artists[0].name}
              />
            </MenuItem>
          );
        }
        if (option.type === "artist") {
          return (
            <MenuItem {...props}>
              <ListItemAvatar>
                <Avatar
                  variant="square"
                  src={option.images.length > 0 ? option.images[0].url : ""}
                />
              </ListItemAvatar>
              <ListItemText primary={option.name} />
            </MenuItem>
          );
        }
        if (option.type === "album") {
          return (
            <MenuItem {...props}>
              <ListItemAvatar>
                <Avatar variant="square" src={option.images[0].url} />
              </ListItemAvatar>
              <ListItemText
                primary={option.name}
                secondary={option.artists[0].name}
              />
            </MenuItem>
          );
        }
        return <li {...props} />;
      }}
      filterOptions={(x) => x}
      renderInput={(params) => (
        <StyledInput
          fullWidth
          ref={params.InputProps.ref}
          inputProps={params.inputProps}
          autoFocus
          placeholder="Search..."
          endAdornment={
            <Stack direction="row" spacing={0.5}>
              {["track", "artist", "album"].map((e) => (
                <Chip
                  key={e}
                  size="small"
                  label={e}
                  onClick={() => setType(e)}
                  color={type === e ? "primary" : undefined}
                />
              ))}
            </Stack>
          }
        />
      )}
      value={null}
      onChange={(event, newValue) => {
        if (newValue) {
          setQ("");
          setResults([]);
          debouncedSearch.clear();

          if (newValue.type === "track") navigate("/track/" + newValue.id);
          if (newValue.type === "artist") navigate("/artist/" + newValue.id);
          if (newValue.type === "album") navigate("/album/" + newValue.id);
        }
      }}
      inputValue={q}
      onInputChange={(event, newValue: any | null) => {
        setQ(newValue);
        if (!newValue) {
          debouncedSearch.clear();
        } else {
          debouncedSearch(newValue);
        }
      }}
    />
  );
}
