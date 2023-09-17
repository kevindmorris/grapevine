import React from "react";
import { useParams } from "react-router-dom";
import { Container, Typography } from "@mui/material";

import LoadingSpinner from "../../shared/LoadingSpinner";
import { AlbumList, ArtistList, TrackList } from "../../shared/Elements";
import { AlbumHero, ArtistHero } from "../../shared/Heroes";
import { Api } from "../../../services/Api";
import { useAppSelector } from "../../../state/hooks";
import {
  AlbumObject,
  ArtistObject,
  TrackObject,
} from "../../../types/interfaces";

export default function Page() {
  const { id } = useParams();

  const token = useAppSelector((state) => state.auth.token);

  const [loading, setLoading] = React.useState<boolean>(false);
  const [album, setAlbum] = React.useState<AlbumObject>();

  const api = new Api();

  const fetchAlbum = React.useCallback(
    async (id: string) => {
      setLoading(true);
      const response = await api.getAlbum({
        albumId: id,
        access_token: token.access_token,
      });
      setAlbum(response);
      setLoading(false);
    },
    [token.access_token, id]
  );

  React.useEffect(() => {
    if (id) {
      fetchAlbum(id);
    }
  }, [id]);

  if (loading) return <LoadingSpinner />;

  if (!album || token.access_token === "") return null;

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      <AlbumHero album={album} />

      <Tracks album={album} />
    </Container>
  );
}

function Tracks({ album }: { album: AlbumObject }) {
  const token = useAppSelector((state) => state.auth.token);

  const [loading, setLoading] = React.useState<boolean>(false);
  const [tracks, setTracks] = React.useState<TrackObject[]>();

  const api = new Api();

  const fetchTracks = React.useCallback(
    async (id: string) => {
      setLoading(true);
      const response = await api.getAlbumTracks({
        albumId: id,
        access_token: token.access_token,
      });
      setTracks(response.items);
      setLoading(false);
    },
    [token.access_token]
  );

  React.useEffect(() => {
    fetchTracks(album.id);
  }, [album.id]);

  if (loading) return <LoadingSpinner />;

  return <TrackList tracks={tracks} />;
}
