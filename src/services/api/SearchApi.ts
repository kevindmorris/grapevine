import { TrackSearchObject } from "../../types/types";
import _BaseApi from "./_BaseApi";

export default class SearchApi {
  baseApi() {
    return new _BaseApi();
  }

  async getSearch(
    q: string,
    type: string,
    access_token: string,
    limit?: number
  ): Promise<TrackSearchObject> {
    let response = await this.baseApi().axios.get(
      this.baseApi().base +
        `/search?q=${q}&type=${type}` +
        (limit ? `&limit=${limit}` : ""),
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    );

    return response.data;
  }
}
