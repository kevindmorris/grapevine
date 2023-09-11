import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TrackObject } from "../../types/interfaces";

type State = {
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

const initialState: State = {
  minPopularity: 0,
  maxPopularity: 100,
  minAcousticness: 0,
  maxAcousticness: 1,
  minDanceability: 0,
  maxDanceability: 1,
  minEnergy: 0,
  maxEnergy: 1,
  minInstrumentalness: 0,
  maxInstrumentalness: 1,
  minTempo: 0,
  maxTempo: 200,
  minValence: 0,
  maxValence: 1,
};

export const controlsSlice = createSlice({
  name: "controls",
  initialState,
  reducers: {
    setDefaultPopularity: (state, action: PayloadAction<number[]>) => {
      state.minPopularity = action.payload[0];
      state.maxPopularity = action.payload[1];
    },
    setDefaultAcousticness: (state, action: PayloadAction<number[]>) => {
      state.minAcousticness = action.payload[0];
      state.maxAcousticness = action.payload[1];
    },
    setDefaultDanceability: (state, action: PayloadAction<number[]>) => {
      state.minDanceability = action.payload[0];
      state.maxDanceability = action.payload[1];
    },
    setDefaultEnergy: (state, action: PayloadAction<number[]>) => {
      state.minEnergy = action.payload[0];
      state.maxEnergy = action.payload[1];
    },
    setDefaultInstrumentalness: (state, action: PayloadAction<number[]>) => {
      state.minInstrumentalness = action.payload[0];
      state.maxInstrumentalness = action.payload[1];
    },
    setDefaultTempo: (state, action: PayloadAction<number[]>) => {
      state.minTempo = action.payload[0];
      state.maxTempo = action.payload[1];
    },
    setDefaultValence: (state, action: PayloadAction<number[]>) => {
      state.minValence = action.payload[0];
      state.maxValence = action.payload[1];
    },
  },
});

export const {
  setDefaultPopularity,
  setDefaultAcousticness,
  setDefaultDanceability,
  setDefaultEnergy,
  setDefaultInstrumentalness,
  setDefaultTempo,
  setDefaultValence,
} = controlsSlice.actions;

export default controlsSlice.reducer;
