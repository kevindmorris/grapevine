export interface TokenObject {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface SearchObject {
  tracks?: {
    href: string;
    limit: number;
    next: string;
    offset: number;
    previous: string | null;
    total: number;
    items: TrackObject[];
  };
  albums?: {
    href: string;
    limit: number;
    next: string;
    offset: number;
    previous: string | null;
    total: number;
    items: AlbumObject[];
  };
  artists?: {
    href: string;
    limit: number;
    next: string;
    offset: number;
    previous: string | null;
    total: number;
    items: ArtistObject[];
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
  artists: ArtistObject[];
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
  restrictions: { reason: string };
  type: string;
  uri: string;
  copyrights: { text: string; type: string };
  external_ids: { isrc: string; ean: string; upc: string };
  genres: string[];
  label: string;
  popularity: number;
  album_group: string;
}

export interface ArtistObject {
  external_urls: {
    spotify: string;
  };
  followers: { href?: string; total: number };
  genres: string[];
  href: string;
  id: string;
  images: ImageObject[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

export interface ImageObject {
  url: string;
  width?: number;
  height?: number;
}

export interface TrackAudioFeaturesObject {
  acousticness: number;
  analysis_url: string;
  danceability: number;
  duration_ms: number;
  energy: number;
  id: string;
  instrumentalness: number;
  key: number;
  liveness: number;
  loudness: number;
  mode: number;
  speechiness: number;
  tempo: number;
  time_signature: number;
  track_href: string;
  type: string;
  uri: string;
  valence: number;
}

export interface TrackRecommendationsObject {
  seeds: Array<{
    afterFilteringSize: number;
    afterRelinkingSize: number;
    href: string;
    id: string;
    initialPoolSize: number;
    type: string;
  }>;
  tracks: Array<TrackObject>;
}
