import React from "react";
import { useParams } from "react-router-dom";
import { Api } from "../../../services/Api";
import { useAppSelector } from "../../../state/hooks";
import { TrackObject } from "../../../types/types";
import { CircularProgress, Divider, useTheme } from "@mui/material";
import TrackInformation from "./TrackInformation";
import TrackRecommendations from "./TrackRecommendations";
import TrackAudioFeatures from "./TrackAudioFeatures";

export default function Track() {
  const { id } = useParams();

  const theme = useTheme();

  const token = useAppSelector((state) => state.auth.token);

  const [track, setTrack] = React.useState<TrackObject>();
  const [loading, setLoading] = React.useState<boolean>(false);

  const api = new Api();

  React.useEffect(() => {
    if (id)
      (async () => {
        setLoading(true);
        const response = await api.getTrack(id, token.access_token);

        setTrack(response);
        setLoading(false);
      })();
  }, [id]);

  if (loading) return <CircularProgress />;

  return (
    <>
      <div style={{ height: 200, display: "flex", gap: theme.spacing(5) }}>
        <TrackInformation track={track} />
        <Divider orientation="vertical" sx={{ height: "100%" }} />
        <TrackAudioFeatures track={track} />
      </div>
      <br />
      <TrackRecommendations />
    </>
  );
}
