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
    controls,
  }: {
    access_token: string;
    artistIds?: string[];
    trackIds?: string[];
    limit?: number;
    controls: {
      minPopularity: number;
      maxPopularity: number;
      minAcousticness: number;
      maxAcousticness: number;
      minDanceability: number;
      maxDanceability: number;
      minEnergy: number;
      maxEnergy: number;
      minInstrumentalness: number;
      maxInstrumentalness: number;
      minTempo: number;
      maxTempo: number;
      minValence: number;
      maxValence: number;
    };
  }): Promise<TrackRecommendationsObject> {
    let response = await this.baseApi().axios.get(
      this.baseApi().base +
        `/recommendations` +
        (trackIds ? `?seed_tracks=${trackIds.join("%2C")}` : "") +
        (artistIds ? `&seed_artists=${artistIds.join("%2C")}` : "") +
        (limit ? `&limit=${limit}` : "") +
        (controls.minPopularity
          ? `&min_popularity=${controls.minPopularity}`
          : "") +
        (controls.maxPopularity
          ? `&max_popularity=${controls.maxPopularity}`
          : "") +
        (controls.minTempo ? `&min_tempo=${controls.minTempo}` : "") +
        (controls.maxTempo ? `&max_tempo=${controls.maxTempo}` : ""),
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    );

    return response.data;
  }
}
