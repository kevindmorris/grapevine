import { AlbumObject, TrackObject } from "../../types/interfaces";
import _BaseApi from "./_BaseApi";

export default class AlbumApi {
  baseApi() {
    return new _BaseApi();
  }

  async getAlbum({
    albumId,
    access_token,
  }: {
    albumId: string;
    access_token: string;
  }): Promise<AlbumObject> {
    let response = await this.baseApi().axios.get(
      this.baseApi().base + `/albums/${albumId}`,
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    );

    return response.data;
  }

  async getAlbumTracks({
    albumId,
    access_token,
  }: {
    albumId: string;
    access_token: string;
  }): Promise<{
    href: string;
    limit: number;
    next?: string;
    offset: number;
    previos?: string;
    total: number;
    items: TrackObject[];
  }> {
    let response = await this.baseApi().axios.get(
      this.baseApi().base + `/albums/${albumId}/tracks`,
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    );

    return response.data;
  }
}
