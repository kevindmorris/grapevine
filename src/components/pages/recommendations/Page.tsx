import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import TrackList from "../../shared/TrackList";
import { TrackRecommendationsObject } from "../../../types/interfaces";
import { Api } from "../../../services/Api";
import LoadingSpinner from "../../shared/LoadingSpinner";
import { RestartAlt } from "@mui/icons-material";

export default function Page() {
  const dispatch = useAppDispatch();

  const [loadingRecommendations, setLoadingRecommendations] =
    React.useState<boolean>(false);
  const [trackRecommendations, setTrackRecommendations] =
    React.useState<TrackRecommendationsObject>();

  const token = useAppSelector((state) => state.auth.token);
  const savedTracks = useAppSelector((state) => state.saved.tracks);
  const controls = useAppSelector((state) => state.controls);
  const ids = savedTracks.map((t) => t.id);

  const api = new Api();

  const fetchTrackRecommendations = React.useCallback(() => {
    (async () => {
      if (ids.length === 0) return;
      setLoadingRecommendations(true);
      const response: TrackRecommendationsObject = await api.getRecommendations(
        {
          trackIds: ids,
          access_token: token.access_token,
          limit: 15,
          controls: controls,
        }
      );
      setTrackRecommendations(response);
      setLoadingRecommendations(false);
    })();
  }, [ids, token.access_token, controls]);

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
        <Typography fontWeight="bold" mt="auto" mr="auto">
          Custom recommendations based on your saved items and specified
          controls.
        </Typography>

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
          gridColumn: "1/span 2",
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
