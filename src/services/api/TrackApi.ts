import {
  TrackAudioFeaturesObject,
  TrackObject,
  TrackRecommendationsObject,
} from "../../types/types";
import _BaseApi from "./_BaseApi";

export default class TrackApi {
  baseApi() {
    return new _BaseApi();
  }

  async getTrack(trackId: string, access_token: string): Promise<TrackObject> {
    let response = await this.baseApi().axios.get(
      this.baseApi().base + `/tracks/${trackId}`,
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    );

    return response.data;
  }

  async getTrackAudioFeatures(
    trackId: string,
    access_token: string
  ): Promise<TrackAudioFeaturesObject> {
    let response = await this.baseApi().axios.get(
      this.baseApi().base + `/audio-features/${trackId}`,
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    );

    return response.data;
  }

  async getTrackRecommendations(
    trackId: string,
    access_token: string
  ): Promise<TrackRecommendationsObject> {
    let response = await this.baseApi().axios.get(
      this.baseApi().base +
        `/recommendations` +
        `?seed_tracks=${trackId}` +
        `&limit=10`,
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    );

    return response.data;
  }
}
