import { JwtPayload } from "jwt-decode";
import React from "react";

export interface UserSliceState {
  token: string;
  tokenPayload: JwtPayload | null;
  id: number | null;
  email: string;
  firstname: string;
  lastname: string;
}

export interface UserContextState {
  state: UserSliceState;
  dispatch: React.Dispatch<any>;
}
