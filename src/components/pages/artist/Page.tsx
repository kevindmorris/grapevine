import React from "react";
import { useParams } from "react-router-dom";
import { Container, Typography } from "@mui/material";

import LoadingSpinner from "../../shared/LoadingSpinner";
import { AlbumList, ArtistList, TrackList } from "../../shared/Elements";
import { ArtistHero } from "../../shared/Heroes";
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
  const [artist, setArtist] = React.useState<ArtistObject>();

  const api = new Api();

  const fetchArtist = React.useCallback(
    async (id: string) => {
      setLoading(true);
      const response = await api.getArtist({
        artistId: id,
        access_token: token.access_token,
      });
      setArtist(response);
      setLoading(false);
    },
    [token.access_token, id]
  );

  React.useEffect(() => {
    if (id) {
      fetchArtist(id);
    }
  }, [id]);

  if (loading) return <LoadingSpinner />;

  if (!artist || token.access_token === "") return null;

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      <ArtistHero artist={artist} />

      <Typography variant="h6" fontWeight="bold">
        Top Tracks
      </Typography>
      <TopTracks artist={artist} />

      <Typography variant="h6" fontWeight="bold">
        Albums
      </Typography>
      <Albums artist={artist} />

      <Typography variant="h6" fontWeight="bold">
        Related Artists
      </Typography>
      <RelatedArtists artist={artist} />
    </Container>
  );
}

function TopTracks({ artist }: { artist: ArtistObject }) {
  const token = useAppSelector((state) => state.auth.token);

  const [loading, setLoading] = React.useState<boolean>(false);
  const [tracks, setTracks] = React.useState<TrackObject[]>();

  const api = new Api();

  const fetchTracks = React.useCallback(
    async (id: string) => {
      setLoading(true);
      const response = await api.getArtistTopTracks({
        artistId: id,
        access_token: token.access_token,
      });
      setTracks(response.tracks.slice(0, 5));
      setLoading(false);
    },
    [token.access_token, artist.id]
  );

  React.useEffect(() => {
    fetchTracks(artist.id);
  }, [artist.id]);

  if (loading) return <LoadingSpinner />;

  return <TrackList tracks={tracks} />;
}

function Albums({ artist }: { artist: ArtistObject }) {
  const token = useAppSelector((state) => state.auth.token);

  const [loading, setLoading] = React.useState<boolean>(false);
  const [albums, setAlbums] = React.useState<AlbumObject[]>();

  const api = new Api();

  const fetchAlbums = React.useCallback(
    async (id: string) => {
      setLoading(true);
      const response = await api.getArtistAlbums({
        artistId: id,
        access_token: token.access_token,
      });
      setAlbums(response.items);
      setLoading(false);
    },
    [token.access_token, artist.id]
  );

  React.useEffect(() => {
    fetchAlbums(artist.id);
  }, [artist.id]);

  if (loading) return <LoadingSpinner />;

  return <AlbumList albums={albums} />;
}

function RelatedArtists({ artist }: { artist: ArtistObject }) {
  const token = useAppSelector((state) => state.auth.token);

  const [loading, setLoading] = React.useState<boolean>(false);
  const [artists, setArtists] = React.useState<ArtistObject[]>();

  const api = new Api();

  const fetchArtists = React.useCallback(
    async (id: string) => {
      setLoading(true);
      const response = await api.getArtistRelatedArtists({
        artistId: id,
        access_token: token.access_token,
      });
      setArtists(response.artists.slice(0, 7));
      setLoading(false);
    },
    [token.access_token, artist.id]
  );

  React.useEffect(() => {
    fetchArtists(artist.id);
  }, [artist.id]);

  if (loading) return <LoadingSpinner />;

  return <ArtistList artists={artists} />;
}
