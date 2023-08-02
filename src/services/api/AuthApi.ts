import _BaseApi from "./_BaseApi";

export default class AuthApi {
  baseApi() {
    return new _BaseApi();
  }

  async postToken(): Promise<any> {
    let response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" +
        process.env.REACT_APP_CLIENT_ID +
        "&client_secret=" +
        process.env.REACT_APP_CLIENT_SECRET_ID,
    }).then((result) => result.json());

    return response;
  }
}
