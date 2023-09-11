import React from "react";
import {  useParams } from "react-router-dom";
import {
  TrackAudioFeaturesObject,
  TrackObject,
  TrackRecommendationsObject,
} from "../../../types/interfaces";
import { Api } from "../../../services/Api";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import LoadingSpinner from "../../shared/LoadingSpinner";
import {
  Avatar,
  Box,
  Button,
  Container,
  Typography,
  useTheme,
} from "@mui/material";
import {
  Favorite,
  FavoriteBorder,
  Launch,
  RestartAlt,
} from "@mui/icons-material";
import { addTrack, removeTrack } from "../../../state/slices/savedSlice";
import TrackList from "../../shared/TrackList";

export default function Page() {
  const { id } = useParams();

  const token = useAppSelector((state) => state.auth.token);

  const [loading, setLoading] = React.useState<boolean>(false);
  const [loadingAudioFeatures, setLoadingAudioFeatures] =
    React.useState<boolean>(false);
  const [loadingRecommendations, setLoadingRecommendations] =
    React.useState<boolean>(false);

  const [track, setTrack] = React.useState<TrackObject>();
  const [trackAudioFeatures, setTrackAudioFeatures] =
    React.useState<TrackAudioFeaturesObject>();
  const [trackRecommendations, setTrackRecommendations] =
    React.useState<TrackRecommendationsObject>();

  const api = new Api();

  const fetchTrack = async (id: string) => {
    setLoading(true);
    const response: TrackObject = await api.getTrack({
      trackId: id,
      access_token: token.access_token,
    });
    setTrack(response);
    setLoading(false);
  };
  const fetchTrackAudioFeatures = async (id: string) => {
    setLoadingAudioFeatures(true);
    const response: TrackAudioFeaturesObject = await api.getTrackAudioFeatures({
      trackId: id,
      access_token: token.access_token,
    });
    setTrackAudioFeatures(response);
    setLoadingAudioFeatures(false);
  };
  const fetchTrackRecommendations = async (id: string) => {
    setLoadingRecommendations(true);
    const response: TrackRecommendationsObject = await api.getRecommendations({
      trackIds: [id],
      access_token: token.access_token,
      limit: 15,
    });
    setTrackRecommendations(response);
    setLoadingRecommendations(false);
  };

  React.useEffect(() => {
    if (id) {
      fetchTrack(id);
      fetchTrackAudioFeatures(id);
      fetchTrackRecommendations(id);
    }
  }, [id]);

  if (loading || loadingAudioFeatures) return <LoadingSpinner />;

  if (
    !track ||
    !trackAudioFeatures ||
    !trackRecommendations ||
    token.access_token === ""
  )
    return null;

  return (
    <Container
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 2fr",
        gridTemplateRows: "auto 1fr",
      }}
    >
      <TrackHero
        track={track}
        fetchTrackRecommendations={fetchTrackRecommendations}
      />
      <TrackAudioFeatures
        track={track}
        trackAudioFeatures={trackAudioFeatures}
      />
      <TrackRecommendations
        loading={loadingRecommendations}
        tracks={trackRecommendations?.tracks}
      />
    </Container>
  );
}

function TrackHero({
  track,
  fetchTrackRecommendations,
}: {
  track: TrackObject;
  fetchTrackRecommendations: (id: string) => Promise<void>;
}) {
  const dispatch = useAppDispatch();

  const savedTracks = useAppSelector((state) => state.saved.tracks);
  const saved = savedTracks.some((t) => t.id === track.id);

  return (
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
      <Avatar
        variant="square"
        src={track?.album.images[0].url}
        alt="image"
        sx={{ height: 100, width: 100 }}
      />
      <div style={{ flex: 1, overflow: "hidden" }}>
        <Typography variant="h6" noWrap>
          {track.name}
        </Typography>
        <Typography color="text.secondary" noWrap>
          {track?.artists.map((artist, i) => artist.name).join(", ")}
        </Typography>
        <Typography color="text.secondary" noWrap>
          {track.album.name}
        </Typography>
      </div>
      <div style={{ marginLeft: "auto", marginTop: "auto" }}>
        <Button
          startIcon={saved ? <Favorite /> : <FavoriteBorder />}
          onClick={() =>
            saved ? dispatch(removeTrack(track)) : dispatch(addTrack(track))
          }
        >
          Save Track
        </Button>
        <Button
          startIcon={<RestartAlt />}
          onClick={() => {
            fetchTrackRecommendations(track.id);
          }}
        >
          Refresh
        </Button>
      </div>
    </Box>
  );
}

function TrackAudioFeatures({
  track,
  trackAudioFeatures,
}: {
  track: TrackObject;
  trackAudioFeatures: TrackAudioFeaturesObject;
}) {
  return (
    <Box
      sx={{
        gridRow: 2,
        gridColumn: 1,
        height: "max-content",
        py: 2,
        px: 3,
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        columnGap: 2,
        gridTemplateRows: "repeat(11, 1fr)",
      }}
    >
      <Typography sx={{ gridRow: 1, gridColumn: 1 }}>Popularity</Typography>
      <Typography sx={{ gridRow: 1, gridColumn: 2 }}>
        {track.popularity}
      </Typography>

      <Typography sx={{ gridRow: 2, gridColumn: 1 }}>Acousticness</Typography>
      <Typography sx={{ gridRow: 2, gridColumn: 2 }}>
        {trackAudioFeatures.acousticness}
      </Typography>

      <Typography sx={{ gridRow: 3, gridColumn: 1 }}>Danceability</Typography>
      <Typography sx={{ gridRow: 3, gridColumn: 2 }}>
        {trackAudioFeatures.danceability}
      </Typography>

      <Typography sx={{ gridRow: 4, gridColumn: 1 }}>Energy</Typography>
      <Typography sx={{ gridRow: 4, gridColumn: 2 }}>
        {trackAudioFeatures.energy}
      </Typography>

      <Typography sx={{ gridRow: 5, gridColumn: 1 }}>
        Instrumentalness
      </Typography>
      <Typography sx={{ gridRow: 5, gridColumn: 2 }}>
        {trackAudioFeatures.instrumentalness}
      </Typography>

      <Typography sx={{ gridRow: 6, gridColumn: 1 }}>Liveness</Typography>
      <Typography sx={{ gridRow: 6, gridColumn: 2 }}>
        {trackAudioFeatures.liveness}
      </Typography>

      <Typography sx={{ gridRow: 7, gridColumn: 1 }}>Loudness</Typography>
      <Typography sx={{ gridRow: 7, gridColumn: 2 }}>
        {trackAudioFeatures.loudness}
      </Typography>

      <Typography sx={{ gridRow: 8, gridColumn: 1 }}>Speechiness</Typography>
      <Typography sx={{ gridRow: 8, gridColumn: 2 }}>
        {trackAudioFeatures.speechiness}
      </Typography>

      <Typography sx={{ gridRow: 9, gridColumn: 1 }}>Tempo</Typography>
      <Typography sx={{ gridRow: 9, gridColumn: 2 }}>
        {trackAudioFeatures.tempo}
      </Typography>

      <Typography sx={{ gridRow: 10, gridColumn: 1 }}>Valence</Typography>
      <Typography sx={{ gridRow: 10, gridColumn: 2 }}>
        {trackAudioFeatures.valence}
      </Typography>
    </Box>
  );
}

function TrackRecommendations({
  tracks,
  loading,
}: {
  tracks: TrackObject[];
  loading: boolean;
}) {
  return (
    <Box
      sx={{
        gridRow: 2,
        gridColumn: 2,
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {loading ? <LoadingSpinner /> : <TrackList tracks={tracks} />}
    </Box>
  );
}
