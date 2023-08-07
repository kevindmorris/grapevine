import React from "react";
import { useAppSelector } from "../../../state/hooks";
import { useTheme } from "@mui/material";
import { TrackAudioFeaturesObject, TrackObject } from "../../../types/types";
import { Api } from "../../../services/Api";
import TrackAudioFeature from "./TrackAudioFeature";

export default function TrackAudioFeatures({ track }: { track?: TrackObject }) {
  const theme = useTheme();

  const token = useAppSelector((state) => state.auth.token);

  const [trackAudioFeatures, setTrackAudioFeatures] =
    React.useState<TrackAudioFeaturesObject>();
  const [loading, setLoading] = React.useState<boolean>(false);

  const api = new Api();

  React.useEffect(() => {
    if (track?.id)
      (async () => {
        setLoading(true);
        const audioFeatures = await api.getTrackAudioFeatures(
          track.id,
          token.access_token
        );

        setTrackAudioFeatures(audioFeatures);
        setLoading(false);
      })();
  }, [track]);

  if (!trackAudioFeatures || !track) return null;

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: theme.spacing(0.5),
      }}
    >
      <TrackAudioFeature value={track.popularity / 100} title="Popularity" />
      <TrackAudioFeature
        value={trackAudioFeatures.acousticness}
        title="Acousticness"
      />
      <TrackAudioFeature
        value={trackAudioFeatures.danceability}
        title="Danceability"
      />
      <TrackAudioFeature value={trackAudioFeatures.energy} title="Energy" />
      <TrackAudioFeature
        value={trackAudioFeatures.tempo / 220}
        title={`Tempo: ${trackAudioFeatures.tempo.toFixed()} BPM`}
      />
      <TrackAudioFeature value={trackAudioFeatures.valence} title="Valence" />
    </div>
  );
}
