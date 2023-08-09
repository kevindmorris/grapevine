import { TrackRecommendationsObject } from "../../types/types";
import _BaseApi from "./_BaseApi";

export default class RecommendationsApi {
  baseApi() {
    return new _BaseApi();
  }

  async getRecommendations({
    artistIds,
    trackIds,
    limit,
    access_token,
  }: {
    artistIds?: string[];
    trackIds?: string[];
    limit?: number;
    access_token: string;
  }): Promise<TrackRecommendationsObject> {
    let response = await this.baseApi().axios.get(
      this.baseApi().base +
        `/recommendations` +
        (trackIds ? `?seed_tracks=${trackIds.join(",")}` : "") +
        (artistIds ? `&seed_tracks=${artistIds.join(",")}` : "") +
        (limit ? `&limit=10` : ""),
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    );

    return response.data;
  }
}
