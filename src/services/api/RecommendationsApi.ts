import { TrackRecommendationsObject } from "../../types/interfaces";
import _BaseApi from "./_BaseApi";

export default class RecommendationsApi {
  baseApi() {
    return new _BaseApi();
  }

  async getRecommendations({
    access_token,
    artistIds,
    trackIds,
    limit,
    min_popularity,
    max_popularity,
    min_tempo,
    max_tempo,
  }: {
    access_token: string;
    artistIds?: string[];
    trackIds?: string[];
    limit?: number;
    min_popularity?: number;
    max_popularity?: number;
    min_tempo?: number;
    max_tempo?: number;
  }): Promise<TrackRecommendationsObject> {
    let response = await this.baseApi().axios.get(
      this.baseApi().base +
        `/recommendations` +
        (trackIds ? `?seed_tracks=${trackIds.join(",")}` : "") +
        (artistIds ? `&seed_tracks=${artistIds.join(",")}` : "") +
        (limit ? `&limit=${limit}` : "") +
        (min_popularity ? `&min_popularity=${min_popularity}` : "") +
        (max_popularity ? `&max_popularity=${max_popularity}` : "") +
        (min_tempo ? `&min_tempo=${min_tempo}` : "") +
        (max_tempo ? `&max_tempo=${max_tempo}` : ""),
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    );

    return response.data;
  }
}
