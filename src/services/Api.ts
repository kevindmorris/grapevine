import AlbumApi from "./api/AlbumApi";
import ArtistApi from "./api/ArtistApi";
import AuthApi from "./api/AuthApi";
import RecommendationsApi from "./api/RecommendationsApi";
import SearchApi from "./api/SearchApi";
import TrackApi from "./api/TrackApi";

export class Api {}

export interface Api
  extends AlbumApi,
    ArtistApi,
    AuthApi,
    RecommendationsApi,
    SearchApi,
    TrackApi {}

function applyMixins(derivedCtor: any, constructors: any[]) {
  constructors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      Object.defineProperty(
        derivedCtor.prototype,
        name,
        Object.getOwnPropertyDescriptor(baseCtor.prototype, name) ||
          Object.create(null)
      );
    });
  });
}

applyMixins(Api, [
  AlbumApi,
  ArtistApi,
  AuthApi,
  RecommendationsApi,
  SearchApi,
  TrackApi,
]);
