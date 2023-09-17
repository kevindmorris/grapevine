import React from "react";
import { AlbumObject, ArtistObject, TrackObject } from "../../types/interfaces";
import { Link, Typography } from "@mui/material";
import { Favorite } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { addTrack, removeTrack } from "../../state/slices/savedSlice";
import {
  GrapevineAvatar,
  GrapevineHeroBox,
  GrapevineIconButton,
} from "./General";

export function TrackHero({ track }: { track: TrackObject }) {
  const dispatch = useAppDispatch();

  const savedTracks = useAppSelector((state) => state.saved.tracks);
  const saved = savedTracks.some((t) => t.id === track.id);

  return (
    <GrapevineHeroBox>
      <GrapevineAvatar
        src={track.album.images[0].url}
        alt={track.name}
        sx={{ height: 175, width: 175 }}
      />
      <div style={{ flex: 1, overflow: "hidden" }}>
        <Typography variant="h4" fontWeight="bold" noWrap>
          {track.name}
        </Typography>
        <Typography color="text.secondary" noWrap>
          {track?.artists.map((artist, i) => (
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
        </Typography>
        <Link
          href={`/album/${track.album.id}`}
          onClick={(e) => e.stopPropagation()}
          color="text.secondary"
          underline="hover"
          noWrap
        >
          {track.album.name}
        </Link>
      </div>
      <div style={{ marginLeft: "auto", marginTop: "auto" }}>
        <GrapevineIconButton
          size="large"
          color={saved ? "primary" : "default"}
          onClick={(e) => {
            e.stopPropagation();
            saved ? dispatch(removeTrack(track)) : dispatch(addTrack(track));
          }}
        >
          <Favorite fontSize="large" />
        </GrapevineIconButton>
      </div>
    </GrapevineHeroBox>
  );
}

export function AlbumHero({ album }: { album: AlbumObject }) {
  return (
    <GrapevineHeroBox>
      <GrapevineAvatar
        src={album?.images[0].url}
        alt={album.name}
        sx={{ height: 175, width: 175 }}
      />
      <div style={{ flex: 1, overflow: "hidden" }}>
        <Typography variant="h4" fontWeight="bold" noWrap>
          {album.name}
        </Typography>
        <Typography color="text.secondary" noWrap>
          {album?.artists.map((artist, i) => (
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
        </Typography>
        <Typography color="text.secondary" noWrap>
          {new Date(album.release_date).getFullYear()}
        </Typography>
      </div>
    </GrapevineHeroBox>
  );
}

export function ArtistHero({ artist }: { artist: ArtistObject }) {
  return (
    <GrapevineHeroBox>
      <GrapevineAvatar
        src={artist.images[0].url}
        alt={artist.name}
        sx={{ height: 175, width: 175 }}
      />
      <div style={{ flex: 1, overflow: "hidden" }}>
        <Typography variant="h4" fontWeight="bold" noWrap>
          {artist.name}
        </Typography>
        <Typography color="text.secondary" noWrap>
          {artist.followers.total.toLocaleString("en-US")} followers
        </Typography>
      </div>
    </GrapevineHeroBox>
  );
}
