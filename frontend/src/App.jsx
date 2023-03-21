import Login from "./components/Login";
import Register from "./components/Register";
import { LoginContext } from "./context/AuthContext";
import Home from "./components/Home"
import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

function App() {
	const [ userEmail, setUserEmail ] = useState("");
	const [ userFullName, setUserFullName ] = useState("");
	const [ userRole, setUserRole ] = useState("");

	return (
		 <LoginContext.Provider value={{ userEmail, setUserEmail, userFullName, setUserFullName, userRole, setUserRole }}>
			<Router>
				<Routes>
					<Route
						exact
						path="/login"
						element={<Login />}
					/>
					<Route
						exact
						path="/register"
						element={<Register />}
					/>
					<Route
						exact
						path="/"
						element={<Home />}
					/>
					<Route
						exact
						path="/test"
						element={<h1>{userEmail}</h1>}
					/>
				</Routes>
			</Router>

			<ToastContainer />
		</LoginContext.Provider>
	);
}

export default App;
