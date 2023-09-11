import { AlbumObject, ArtistObject, TrackObject } from "../../types/interfaces";
import _BaseApi from "./_BaseApi";

export default class ArtistApi {
  baseApi() {
    return new _BaseApi();
  }

  async getArtist({
    artistId,
    access_token,
  }: {
    artistId: string;
    access_token: string;
  }): Promise<ArtistObject> {
    let response = await this.baseApi().axios.get(
      this.baseApi().base + `/artists/${artistId}`,
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    );

    return response.data;
  }

  async getArtistAlbums({
    artistId,
    access_token,
  }: {
    artistId: string;
    access_token: string;
  }): Promise<{
    href: string;
    limit: number;
    next?: string;
    offset: number;
    previous?: string;
    total: number;
    items: AlbumObject[];
  }> {
    let response = await this.baseApi().axios.get(
      this.baseApi().base + `/albums/${artistId}/albums`,
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    );

    return response.data;
  }

  async getArtistTopTracks({
    artistId,
    access_token,
  }: {
    artistId: string;
    access_token: string;
  }): Promise<{ tracks: TrackObject[] }> {
    let response = await this.baseApi().axios.get(
      this.baseApi().base + `/albums/${artistId}/top-tracks`,
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    );

    return response.data;
  }

  async getArtistRelatedArtists({
    artistId,
    access_token,
  }: {
    artistId: string;
    access_token: string;
  }): Promise<{ artists: ArtistObject[] }> {
    let response = await this.baseApi().axios.get(
      this.baseApi().base + `/albums/${artistId}/related-artists`,
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    );

    return response.data;
  }
}
