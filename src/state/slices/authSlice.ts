import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TokenObject } from "../../types/types";
import { Api } from "../../services/Api";

type State = {
  status: { token: "idle" | "pending" | "fulfilled" | "rejected" };
  token: TokenObject;
};

const initialState: State = {
  status: { token: "idle" },
  token: {
    access_token: "",
    token_type: "",
    expires_in: 0,
  },
};

const api = new Api();

export const postTokenAsync = createAsyncThunk("auth/postToken", async () => {
  const response = await api.postToken();
  return response;
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postTokenAsync.pending, (state, action) => {
        state.status.token = "pending";
      })
      .addCase(
        postTokenAsync.fulfilled,
        (state, action: PayloadAction<TokenObject>) => {
          state.status.token = "fulfilled";
          state.token = action.payload;
          state.status.token = "idle";
        }
      )
      .addCase(postTokenAsync.rejected, (state) => {
        state.status.token = "rejected";
      });
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
