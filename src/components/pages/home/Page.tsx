import {
  Box,
  Button,
  Container,
  Divider,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  List,
  ListItem,
  ListItemText,
  Slider,
  Switch,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import TrackList from "../../shared/TrackList";
import { TrackRecommendationsObject } from "../../../types/interfaces";
import { Api } from "../../../services/Api";
import LoadingSpinner from "../../shared/LoadingSpinner";
import { RestartAlt } from "@mui/icons-material";
import { maxHeaderSize } from "http";

export default function Page() {
  const dispatch = useAppDispatch();

  const [loadingRecommendations, setLoadingRecommendations] =
    React.useState<boolean>(false);
  const [trackRecommendations, setTrackRecommendations] =
    React.useState<TrackRecommendationsObject>();

  const token = useAppSelector((state) => state.auth.token);
  const savedTracks = useAppSelector((state) => state.saved.tracks);
  const ids = savedTracks.map((t) => t.id);

  const api = new Api();

  const [popularity, setPopularity] = React.useState<number[]>([0, 100]);
  const handleChangePopularity = (
    event: Event,
    newValue: number | number[]
  ) => {
    setPopularity(newValue as number[]);
  };
  const [tempo, setTempo] = React.useState<number[]>([0, 200]);
  const handleChangeTempo = (event: Event, newValue: number | number[]) => {
    setTempo(newValue as number[]);
  };

  const fetchTrackRecommendations = React.useCallback(() => {
    (async () => {
      if (ids.length === 0) return;
      setLoadingRecommendations(true);
      const response: TrackRecommendationsObject = await api.getRecommendations(
        {
          trackIds: ids,
          access_token: token.access_token,
          limit: 15,
          min_popularity: popularity[0],
          max_popularity: popularity[1],
          min_tempo: tempo[0],
          max_tempo: tempo[1],
        }
      );
      setTrackRecommendations(response);
      setLoadingRecommendations(false);
    })();
  }, [popularity, tempo, ids, token.access_token]);

  React.useEffect(() => {
    fetchTrackRecommendations();
  }, []);

  return (
    <Container
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 2fr",
        gridTemplateRows: "auto 1fr",
      }}
    >
      <Box
        sx={{
          gridRow: 1,
          gridColumn: "1/span 2",
          py: 2,
          px: 3,
          display: "flex",
          gap: 2,
        }}
      >
        <img
          src="/grapevine-logo.png"
          alt="grapevine"
          style={{ width: "20vw", objectFit: "contain" }}
        />

        <div style={{ marginLeft: "auto", marginTop: "auto" }}>
          <Button
            startIcon={<RestartAlt />}
            onClick={() => {
              fetchTrackRecommendations();
            }}
          >
            Refresh
          </Button>
        </div>
      </Box>

      <Box
        sx={{
          gridRow: 2,
          gridColumn: 1,
        }}
      >
        <List>
          <ListItem>
            <ListItemText
              primary="Popularity"
              secondary={`${popularity[0]} to ${popularity[1]}`}
            />
            <Slider
              value={popularity}
              onChange={handleChangePopularity}
              min={0}
              max={100}
              sx={{ width: 150 }}
            />
          </ListItem>

          <ListItem>
            <ListItemText
              primary="Tempo"
              secondary={`${tempo[0]} to ${tempo[1]}`}
            />
            <Slider
              value={tempo}
              onChange={handleChangeTempo}
              min={0}
              max={200}
              sx={{ width: 150 }}
            />
          </ListItem>
        </List>
      </Box>

      <Box
        sx={{
          gridRow: 2,
          gridColumn: 2,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {loadingRecommendations ? (
          <LoadingSpinner />
        ) : (
          <TrackList tracks={trackRecommendations?.tracks} />
        )}
      </Box>
    </Container>
  );
}
