import { JwtPayload } from "jwt-decode";
import React, { createContext, ReactNode, useReducer } from "react";
import { UserContextState, UserSliceState } from "../interfaces/interfaces";

export const UserContext = createContext<UserContextState>({
  state: {
    token: "",
    tokenPayload: null,
    id: null,
    email: "",
    firstname: "",
    lastname: "",
  },
  dispatch: () => {},
});

type UserAction = { type: "setUser"; payload: UserSliceState };

const userReducer = (
  state: UserSliceState,
  action: UserAction
): UserSliceState => {
  switch (action.type) {
    case "setUser":
      return { ...action.payload };
    default:
      return state;
  }
};

interface UserContextProviderProps {
  children: ReactNode;
}

const UserContextProvider: React.FC<UserContextProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(userReducer, {
    token: "",
    tokenPayload: null,
    id: null,
    email: "",
    firstname: "",
    lastname: "",
  });

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
