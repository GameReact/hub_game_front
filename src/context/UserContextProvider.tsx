import { JwtPayload } from "jwt-decode"
import React, { createContext, ReactNode, useReducer } from "react"

interface UserSliceState {
	token: string
	tokenPayload: JwtPayload | null
	id: number | null
	email: string
	firstname: string
	lastname: string
}

interface UserContextState {
	state: UserSliceState
	dispatch: React.Dispatch<any>
}

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
})

type UserAction = { type: "setUser"; payload: UserSliceState }

const userReducer = (
	state: UserSliceState,
	action: UserAction
): UserSliceState => {
	switch (action.type) {
		case "setUser":
			return { ...action.payload }
		default:
			return state
	}
}

interface UserContextProviderProps {
	children: ReactNode;
  }

const UserContextProvider: React.FC<UserContextProviderProps> = ({ children }) => {
	const [state, dispatch] = useReducer(userReducer, {
		token: "",
		tokenPayload: null,
		id: null,
		email: "",
		firstname: "",
		lastname: "",
	})

	return (
		<UserContext.Provider value={{ state, dispatch }}>
			{children}
		</UserContext.Provider>
	)
}

export default UserContextProvider
