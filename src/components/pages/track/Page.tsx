import React from "react";
import { useParams } from "react-router-dom";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Box,
  Container,
  Paper,
  Typography,
  alpha,
  capitalize,
} from "@mui/material";

import {
  TrackAudioFeaturesObject,
  TrackObject,
} from "../../../types/interfaces";
import { Api } from "../../../services/Api";
import { useAppSelector } from "../../../state/hooks";
import LoadingSpinner from "../../shared/LoadingSpinner";
import { TrackHero } from "../../shared/Heroes";
import { TrackList } from "../../shared/Elements";

export default function Page() {
  const { id } = useParams();

  const token = useAppSelector((state) => state.auth.token);

  const [loading, setLoading] = React.useState<boolean>(false);
  const [track, setTrack] = React.useState<TrackObject>();

  const api = new Api();

  const fetchTrack = React.useCallback(
    async (id: string) => {
      setLoading(true);
      const response = await api.getTrack({
        trackId: id,
        access_token: token.access_token,
      });
      setTrack(response);
      setLoading(false);
    },
    [token.access_token, id]
  );

  React.useEffect(() => {
    if (id) {
      fetchTrack(id);
    }
  }, [id]);

  if (loading) return <LoadingSpinner />;

  if (!track || token.access_token === "") return null;

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      <TrackHero track={track} />

      <Typography variant="h6" fontWeight="bold">
        Track Features
      </Typography>
      <TrackAudioFeatures track={track} />

      <Typography variant="h6" fontWeight="bold">
        Similar Tracks
      </Typography>
      <SimilarTracks track={track} />
    </Container>
  );
}

function TrackAudioFeatures({ track }: { track: TrackObject }) {
  const token = useAppSelector((state) => state.auth.token);

  const [loading, setLoading] = React.useState<boolean>(false);
  const [features, setFeatures] = React.useState<TrackAudioFeaturesObject>();

  const api = new Api();

  const fetchFeatures = React.useCallback(
    async (id: string) => {
      setLoading(true);
      const response = await api.getTrackAudioFeatures({
        trackId: id,
        access_token: token.access_token,
      });
      setFeatures(response);
      setLoading(false);
    },
    [token.access_token]
  );

  const data = React.useMemo(
    () => [
      {
        field: "popularity",
        value: track.popularity,
        min: 0,
        max: 100,
        high: 75,
        low: 25,
      },
      {
        field: "acousticness",
        value: features?.acousticness,
        min: 0,
        max: 1,
        high: 0.75,
        low: 0.25,
      },
      {
        field: "danceability",
        value: features?.danceability,
        min: 0,
        max: 1,
        high: 0.75,
        low: 0.25,
      },
      {
        field: "energy",
        value: features?.energy,
        min: 0,
        max: 1,
        high: 0.75,
        low: 0.25,
      },
      {
        field: "instrumentalness",
        value: features?.instrumentalness,
        min: 0,
        max: 1,
        high: 0.75,
        low: 0.25,
      },
      {
        field: "liveness",
        value: features?.liveness,
        min: 0,
        max: 1,
        high: 0.75,
        low: 0.25,
      },
      {
        field: "speechiness",
        value: features?.speechiness,
        min: 0,
        max: 1,
        high: 0.75,
        low: 0.25,
      },
      {
        field: "tempo",
        value: features?.tempo,
        min: 0,
        max: 250,
        high: 130,
        low: 60,
      },
      {
        field: "valence",
        value: features?.valence,
        min: 0,
        max: 1,
        high: 0.75,
        low: 0.25,
      },
    ],
    [track.id, features]
  );

  React.useEffect(() => {
    fetchFeatures(track.id);
  }, [track.id]);

  if (loading || !features) return <LoadingSpinner />;

  const columns: GridColDef[] = [
    {
      field: "field",
      minWidth: 175,
      valueFormatter: (params: any) => capitalize(params.value),
    },
    {
      field: "value",
      minWidth: 250,
      renderCell: (params: any) => (
        <Paper
          variant="outlined"
          sx={{
            width: "100%",
            height: "75%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          {params.value}
          <Box
            sx={{
              bgcolor: (theme) =>
                params.value >= params.row.high
                  ? alpha(theme.palette.success.main, 0.25)
                  : params.value <= params.row.low
                  ? alpha(theme.palette.error.main, 0.25)
                  : alpha(theme.palette.warning.main, 0.25),
              width: `${(100 * params.row.value) / params.row.max}%`,
              height: "100%",
              position: "absolute",
              left: 0,
            }}
          />
        </Paper>
      ),
    },
  ];

  return (
    <DataGrid
      columns={columns}
      rows={data}
      getRowId={(row) => row.field}
      density="compact"
      hideFooter
      slots={{
        columnHeaders: () => null,
      }}
      sx={{
        height: 325,
        [`&.MuiDataGrid-root`]: { border: "none" },
        [`& .MuiDataGrid-row`]: { border: "none" },
        [`& .MuiDataGrid-cell`]: { border: "none" },
      }}
    />
  );
}

function SimilarTracks({ track }: { track: TrackObject }) {
  const token = useAppSelector((state) => state.auth.token);
  const controls = useAppSelector((state) => state.controls);

  const [loading, setLoading] = React.useState<boolean>(false);
  const [tracks, setTracks] = React.useState<TrackObject[]>();

  const api = new Api();

  const fetchTracks = React.useCallback(
    async (id: string) => {
      setLoading(true);
      const response = await api.getRecommendations({
        trackIds: [id],
        access_token: token.access_token,
        controls: controls,
      });
      setTracks(response.tracks.slice(0, 10));
      setLoading(false);
    },
    [token.access_token, controls]
  );

  React.useEffect(() => {
    fetchTracks(track.id);
  }, [track.id]);

  if (loading) return <LoadingSpinner />;

  return <TrackList tracks={tracks} />;
}
