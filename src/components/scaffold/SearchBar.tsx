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
  "& input": {
    borderRadius: 4,
    padding: 8,
    border: `1px solid ${theme.palette.divider}`,
    fontSize: 14,
    transition: "all 0.5s ease",
    [`&:hover`]: {
      backgroundColor: theme.palette.action.hover,
    },
    [`&:focus`]: {
      backgroundColor: theme.palette.action.hover,
    },
  },
}));

export default function SearchBar() {
  const navigate = useNavigate();

  const token = useAppSelector((state) => state.auth.token);

  const [open, setOpen] = React.useState<boolean>(true);
  const [q, setQ] = React.useState<string>("");
  const [results, setResults] = React.useState<TrackObject[]>([]);

  const api = new Api();

  const fetchResults = async (newValue: string) => {
    const response: SearchObject = await api.getSearch({
      q: newValue,
      type: "track",
      access_token: token.access_token,
      limit: 10,
    });
    setResults(response.tracks?.items || []);
  };

  const debouncedSearch = React.useMemo(
    () =>
      debounce((newValue) => {
        fetchResults(newValue);
      }, 1000),
    [token]
  );

  return (
    <Autocomplete
      fullWidth
      open={open && q !== ""}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      options={results}
      getOptionLabel={(option) => option.id}
      renderOption={(props, option) => {
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
      }}
      filterOptions={(x) => x}
      renderInput={(params) => (
        <StyledInput
          fullWidth
          ref={params.InputProps.ref}
          inputProps={params.inputProps}
          autoFocus
          placeholder="Search..."
        />
      )}
      value={null}
      onChange={(event, newValue) => {
        if (newValue) {
          setQ("");
          setResults([]);
          debouncedSearch.clear();
          navigate("/track/" + newValue.id);
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
