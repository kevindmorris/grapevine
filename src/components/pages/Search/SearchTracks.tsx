import React from "react";
import { TrackObject } from "../../../types/types";
import { Api } from "../../../services/Api";
import { useAppSelector } from "../../../state/hooks";
import { CircularProgress, List } from "@mui/material";
import ListItemTrack from "../../shared/ListItemTrack";

export default function SearchTracks({ value }: { value: string }) {
  const token = useAppSelector((state) => state.auth.token);

  const [loading, setLoading] = React.useState<boolean>(false);
  const [tracks, setTracks] = React.useState<TrackObject[]>([]);

  const api = new Api();

  React.useEffect(() => {
    if (value.trim().length < 1) return;
    (async () => {
      setLoading(true);
      const response = await api.getSearch({
        q: value,
        type: "track",
        access_token: token.access_token,
        limit: 10,
      });
      setLoading(false);

      if (response.tracks) setTracks(response.tracks.items);
    })();
  }, [value]);

  if (loading) return <CircularProgress />;

  return (
    <List>
      {tracks.map((track) => (
        <ListItemTrack key={track.id} track={track} />
      ))}
    </List>
  );
}
