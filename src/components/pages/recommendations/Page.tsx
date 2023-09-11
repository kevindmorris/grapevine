import {
  Avatar,
  Button,
  Container,
  List,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Paper,
  useTheme,
} from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import { useNavigate } from "react-router-dom";
import {
  TrackObject,
  TrackRecommendationsObject,
} from "../../../types/interfaces";
import { Api } from "../../../services/Api";
import LoadingSpinner from "../../shared/LoadingSpinner";

export default function Page() {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const token = useAppSelector((state) => state.auth.token);
  const savedTracks = useAppSelector((state) => state.saved.tracks);

  const [loading, setLoading] = React.useState<boolean>(false);
  const [trackRecommendations, setTrackRecommendations] =
    React.useState<TrackRecommendationsObject>();

  const api = new Api();

  const fetchRecommendations = async () => {
    if (savedTracks.length === 0) return;
    setLoading(true);
    const responseRecommendations: TrackRecommendationsObject =
      await api.getRecommendations({
        trackIds: savedTracks.map((track) => track.id),
        access_token: token.access_token,
        limit: 10,
      });
    setTrackRecommendations(responseRecommendations);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchRecommendations();
  }, []);

  return (
    <Container sx={{ display: "flex", gap: 2 }}>
      <Paper variant="outlined" sx={{ flex: 1 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: theme.spacing(1),
          }}
        >
          <Button onClick={() => fetchRecommendations()}>Refresh</Button>
        </div>
      </Paper>
      <Paper
        variant="outlined"
        sx={{ flex: 2, display: "flex", flexDirection: "column" }}
      >
        <Recommendations
          tracks={trackRecommendations?.tracks}
          loading={loading}
        />
      </Paper>
    </Container>
  );
}

const Recommendations = ({
  tracks,
  loading,
}: {
  tracks?: TrackObject[];
  loading: boolean;
}) => {
  const navigate = useNavigate();

  if (loading) return <LoadingSpinner />;

  if (!tracks) return null;

  return (
    <List>
      {tracks.map((track) => (
        <MenuItem
          key={track.id}
          onClick={() => {
            navigate("/track/" + track.id);
          }}
        >
          <ListItemAvatar>
            <Avatar variant="square" src={track.album.images[0].url} />
          </ListItemAvatar>
          <ListItemText
            primary={track.name}
            secondary={track?.artists
              .map((artist, i) => artist.name)
              .join(", ")}
          />
        </MenuItem>
      ))}
    </List>
  );
};
