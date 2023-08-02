export interface TokenObject {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface TrackSearchObject {
  tracks: {
    href: string;
    limit: number;
    next: string;
    offset: number;
    previous: string | null;
    total: number;
    items: TrackObject[];
  };
}

export interface TrackObject {
  album: AlbumObject;
  artists: ArtistObject[];
  availible_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: {
    isrc: string;
  };
  href: string;
  id: string;
  name: string;
  popularity: number;
  preview_url: any;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
}

export interface AlbumObject {
  album_type: string;
  total_tracks: number;
  availible_markets: string[];
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: ImageObject[];
  name: string;
  release_date: string;
  release_date_precision: string;
  type: string;
  uri: string;
  srtists: ArtistObject[];
}

export interface ArtistObject {
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface ImageObject {
  url: string;
  width: number;
  height: number;
}
