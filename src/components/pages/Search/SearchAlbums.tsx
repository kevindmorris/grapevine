import React from "react";
import { AlbumObject } from "../../../types/types";
import { Api } from "../../../services/Api";
import { useAppSelector } from "../../../state/hooks";
import { CircularProgress, List } from "@mui/material";
import ListItemAlbum from "../../shared/ListItemAlbum";

export default function SearchAlbums({ value }: { value: string }) {
  const token = useAppSelector((state) => state.auth.token);

  const [loading, setLoading] = React.useState<boolean>(false);
  const [albums, setAlbums] = React.useState<AlbumObject[]>([]);

  const api = new Api();

  React.useEffect(() => {
    if (value.trim().length < 1) return;
    (async () => {
      setLoading(true);
      const response = await api.getSearch({
        q: value,
        type: "album",
        access_token: token.access_token,
        limit: 10,
      });
      setLoading(false);

      if (response.albums) setAlbums(response.albums.items);
    })();
  }, [value]);

  if (loading) return <CircularProgress />;

  return (
    <List>
      {albums.map((album) => (
        <ListItemAlbum key={album.id} album={album} />
      ))}
    </List>
  );
}
