import React from "react";
import { ArtistObject } from "../../../types/types";
import { Api } from "../../../services/Api";
import { useAppSelector } from "../../../state/hooks";
import { CircularProgress, List } from "@mui/material";
import ListItemArtist from "../../shared/ListItemArtist";

export default function SearchArtists({ value }: { value: string }) {
  const token = useAppSelector((state) => state.auth.token);

  const [loading, setLoading] = React.useState<boolean>(false);
  const [artists, setArtists] = React.useState<ArtistObject[]>([]);

  const api = new Api();

  React.useEffect(() => {
    if (value.trim().length < 1) return;
    (async () => {
      setLoading(true);
      const response = await api.getSearch({
        q: value,
        type: "artist",
        access_token: token.access_token,
        limit: 10,
      });
      setLoading(false);

      if (response.artists) setArtists(response.artists.items);
    })();
  }, [value]);

  if (loading) return <CircularProgress />;

  return (
    <List>
      {artists.map((artist) => (
        <ListItemArtist key={artist.id} artist={artist} />
      ))}
    </List>
  );
}
