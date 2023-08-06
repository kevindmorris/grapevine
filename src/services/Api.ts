import AuthApi from "./api/AuthApi";
import SearchApi from "./api/SearchApi";
import TrackApi from "./api/TrackApi";

export class Api {}

export interface Api extends AuthApi, SearchApi, TrackApi {}

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

applyMixins(Api, [AuthApi, SearchApi, TrackApi]);
