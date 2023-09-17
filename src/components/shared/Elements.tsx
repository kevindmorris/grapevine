import { Link, ListItemAvatar } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Favorite } from "@mui/icons-material";

import { AlbumObject, ArtistObject, TrackObject } from "../../types/interfaces";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { addTrack, removeTrack } from "../../state/slices/savedSlice";
import {
  GrapevineAvatar,
  GrapevineIconButton,
  GrapevineList,
  GrapevineListItemText,
  GrapevineMenuItem,
} from "./General";
import { Api } from "../../services/Api";

export function TrackListItem({
  track,
  saved,
}: {
  track: TrackObject;
  saved: boolean;
}) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const token = useAppSelector((state) => state.auth.token);

  const api = new Api();

  return (
    <GrapevineMenuItem
      onClick={() => {
        navigate("/track/" + track.id);
      }}
    >
      {track.album ? (
        <ListItemAvatar>
          <GrapevineAvatar src={track.album?.images[0].url} alt={track.name} />
        </ListItemAvatar>
      ) : null}
      <GrapevineListItemText
        primary={track.name}
        secondary={track?.artists.map((artist, i) => (
          <React.Fragment key={artist.id}>
            {i ? ", " : ""}
            <Link
              href={`/artist/${artist.id}`}
              onClick={(e) => e.stopPropagation()}
              color="text.secondary"
              underline="hover"
            >
              {artist.name}
            </Link>
          </React.Fragment>
        ))}
      />
      <GrapevineIconButton
        color={saved ? "primary" : "default"}
        onClick={async (e) => {
          e.stopPropagation();
          const t = await api.getTrack({
            trackId: track.id,
            access_token: token.access_token,
          });
          saved ? dispatch(removeTrack(track)) : dispatch(addTrack(t));
        }}
      >
        <Favorite />
      </GrapevineIconButton>
    </GrapevineMenuItem>
  );
}

export function TrackList({ tracks }: { tracks?: TrackObject[] }) {
  const savedTracks = useAppSelector((state) => state.saved.tracks);

  if (!tracks) return null;

  return (
    <GrapevineList>
      {tracks.map((track) => {
        const saved = savedTracks.some((t) => t.id === track.id);
        return <TrackListItem key={track.id} track={track} saved={saved} />;
      })}
    </GrapevineList>
  );
}

export function AlbumListItem({ album }: { album: AlbumObject }) {
  const navigate = useNavigate();

  return (
    <GrapevineMenuItem
      onClick={() => {
        navigate("/album/" + album.id);
      }}
    >
      <ListItemAvatar>
        <GrapevineAvatar src={album.images[0].url} alt={album.name} />
      </ListItemAvatar>
      <GrapevineListItemText
        primary={album.name}
        secondary={album?.artists.map((artist, i) => (
          <React.Fragment key={artist.id}>
            {i ? ", " : ""}
            <Link
              href={`/artist/${artist.id}`}
              onClick={(e) => e.stopPropagation()}
              color="text.secondary"
              underline="hover"
            >
              {artist.name}
            </Link>
          </React.Fragment>
        ))}
      />
    </GrapevineMenuItem>
  );
}

export function AlbumList({ albums }: { albums?: AlbumObject[] }) {
  if (!albums) return null;

  return (
    <GrapevineList>
      {albums.map((album) => (
        <AlbumListItem key={album.id} album={album} />
      ))}
    </GrapevineList>
  );
}

export function ArtistListItem({ artist }: { artist: ArtistObject }) {
  const navigate = useNavigate();

  return (
    <GrapevineMenuItem
      onClick={() => {
        navigate("/artist/" + artist.id);
      }}
    >
      <ListItemAvatar>
        <GrapevineAvatar src={artist.images[0].url} alt={artist.name} />
      </ListItemAvatar>
      <GrapevineListItemText primary={artist.name} />
    </GrapevineMenuItem>
  );
}

export function ArtistList({ artists }: { artists?: ArtistObject[] }) {
  if (!artists) return null;

  return (
    <GrapevineList>
      {artists.map((artist) => (
        <ArtistListItem key={artist.id} artist={artist} />
      ))}
    </GrapevineList>
  );
}
