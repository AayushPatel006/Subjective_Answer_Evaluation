import { createContext, useReducer, useEffect } from "react";
import httpRequest from "../utils/httpRequest";
import verifyToken from "../utils/verifyToken";
export const AuthContext = createContext({});

export const authReducer = (state, action) => {
	switch (action.type) {
		case "LOGIN":
			return { user: { ...action.payload } };
		case "LOGOUT":
			return { user: null };
		default:
			return state;
	}
};
export const AuthContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer, {
		user: null,
	});

	useEffect(() => {
		const func = async () => {
			const payload = await verifyToken();
			if (payload) {
				dispatch({ type: "LOGIN", payload: payload });
			} else {
				dispatch({ type: "LOGOUT" });
			}
		};

		func();
	}, []);

	const login = async (email, password) => {
		const { data, error } = await httpRequest(
			"/login",
			"post",
			{
				email: email,
				password: password,
			},
			false,
			true,
		);

		if (!error) {
			localStorage.setItem("token", data.token);
			const payload = await verifyToken(data.token);
			dispatch({ type: "LOGIN", payload: payload });
			return true;
		}

		return false;
	};

	const logout = () => {
		localStorage.clear();
		dispatch({ type: "LOGOUT" });
	};

	const register = async (full_name, email, password, confirm_password) => {
		// checking if both the password matches
		if (password !== confirm_password) {
			notify("Password doesn't match", "error");
			return;
		}

		const { data, error } = await httpRequest(
			"/register",
			"post",
			{
				full_name: full_name,
				password: password,
				email: email,
			},
			true
		);

		if (!error) {
			return data;
		}

		return false;
	};

	return (
		<AuthContext.Provider
			value={{
				...state,
				login,
				register,
				logout,
				dispatch,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
