import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TrackObject } from "../../types/interfaces";

type State = {
  tracks: TrackObject[];
};

const initialState: State = {
  tracks: [],
};

export const savedSlice = createSlice({
  name: "saved",
  initialState,
  reducers: {
    addTrack: (state, action: PayloadAction<TrackObject>) => {
      state.tracks = [...state.tracks, action.payload];
    },
    removeTrack: (state, action: PayloadAction<TrackObject>) => {
      state.tracks = state.tracks.filter(
        (track) => track.id !== action.payload.id
      );
    },
  },
});

export const { addTrack, removeTrack } = savedSlice.actions;

export default savedSlice.reducer;
