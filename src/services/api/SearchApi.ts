import { SearchObject } from "../../types/interfaces";
import _BaseApi from "./_BaseApi";

export default class SearchApi {
  baseApi() {
    return new _BaseApi();
  }

  async getSearch({
    q,
    type,
    limit,
    offset,
    access_token,
  }: {
    q: string;
    type: string;
    limit?: number;
    offset?: number;
    access_token: string;
  }): Promise<SearchObject> {
    let response = await this.baseApi().axios.get(
      this.baseApi().base +
        `/search` +
        `?q=${q}` +
        `&type=${type}` +
        (limit ? `&limit=${limit}` : "") +
        (offset ? `&offset=${offset}` : ""),
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    );

    return response.data;
  }
}
