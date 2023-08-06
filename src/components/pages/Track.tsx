import React from "react";
import { useParams } from "react-router-dom";
import { Api } from "../../services/Api";
import { useAppSelector } from "../../state/hooks";
import { TrackAudioFeaturesObject, TrackObject } from "../../types/types";
import { Typography, useTheme } from "@mui/material";

export default function Track() {
  const { id } = useParams();

  const theme = useTheme();

  const token = useAppSelector((state) => state.auth.token);

  const [track, setTrack] = React.useState<TrackObject>();
  const [trackAudioFeatures, setTrackAudioFeatures] =
    React.useState<TrackAudioFeaturesObject>();
  const [loading, setLoading] = React.useState<boolean>(false);

  const api = new Api();

  React.useEffect(() => {
    if (id)
      (async () => {
        setLoading(true);
        const response = await api.getTrack(id, token.access_token);
        const audioFeatures = await api.getTrackAudioFeatures(
          id,
          token.access_token
        );

        setTrack(response);
        setTrackAudioFeatures(audioFeatures);
      })();
  }, [id]);

  return (
    <div>
      <div style={{ display: "flex", gap: theme.spacing(2) }}>
        <img
          src={track?.album.images[1].url}
          alt=""
          style={{ width: 100, height: 100 }}
        />
        <div>
          <Typography variant="h6">{track?.name}</Typography>
          <Typography>
            {track?.artists.map((a) => a.name).join(", ")}
          </Typography>
          <Typography>{track?.album.name}</Typography>
        </div>
      </div>
      <br />
      <div>acousticness: {trackAudioFeatures?.acousticness}</div>
      <div>danceability: {trackAudioFeatures?.danceability}</div>
      <div>energy: {trackAudioFeatures?.energy}</div>
      <div>instrumentalness: {trackAudioFeatures?.instrumentalness}</div>
      <div>tempo: {trackAudioFeatures?.tempo}</div>
      <div>valence: {trackAudioFeatures?.valence}</div>
    </div>
  );
}
