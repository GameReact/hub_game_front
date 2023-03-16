import { JwtPayload } from "jwt-decode";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserSliceState {
  token: string;
  tokenPayload: JwtPayload | null;
  id: number | null;
  email: string;
  firstname: string;
  lastname: string;
}

const initialState: UserSliceState = {
  token: "",
  tokenPayload: null,
  id: null,
  email: "",
  firstname: "",
  lastname: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInformation: (state, action: PayloadAction<UserSliceState>) => {
      state.token = action.payload.token;
      state.tokenPayload = action.payload.tokenPayload;
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
    },
    logoutUser: (state) => {
      state.token = "";
      state.tokenPayload = null;
      state.id = null;
      state.email = "";
      state.firstname = "";
      state.lastname = "";
    },
  },
});

export const { setUserInformation, logoutUser } = userSlice.actions;

// this is for configureStore
export default userSlice.reducer;
