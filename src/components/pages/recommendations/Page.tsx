import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import {
  TrackObject,
  TrackRecommendationsObject,
} from "../../../types/interfaces";
import { Api } from "../../../services/Api";
import LoadingSpinner from "../../shared/LoadingSpinner";
import { RestartAlt } from "@mui/icons-material";
import { TrackList } from "../../shared/Elements";

export default function Page() {
  const token = useAppSelector((state) => state.auth.token);
  const savedTracks = useAppSelector((state) => state.saved.tracks);
  const savedTracksIds = savedTracks.map((t) => t.id);
  const controls = useAppSelector((state) => state.controls);

  const [loading, setLoading] = React.useState<boolean>(false);
  const [tracks, setTracks] = React.useState<TrackObject[]>();

  const api = new Api();

  const fetchTracks = React.useCallback(
    async (ids: string[]) => {
      setLoading(true);
      const response = await api.getRecommendations({
        trackIds: ids,
        access_token: token.access_token,
        controls: controls,
      });
      setTracks(response.tracks);
      setLoading(false);
    },
    [token.access_token, controls]
  );

  React.useEffect(() => {
    if (savedTracksIds.length === 0) return;
    fetchTracks(savedTracksIds);
  }, [savedTracks]);

  if (loading) return <LoadingSpinner />;

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      <Typography variant="h6" fontWeight="bold">
        Recommendations
      </Typography>
      {savedTracksIds.length === 0 ? (
        <Typography>Save tracks to generate recommendations.</Typography>
      ) : null}
      <TrackList tracks={tracks} />
    </Container>
  );
}
