import Login from "./components/Login";
import Register from "./components/Register";
import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
	return (
		<div>
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
				</Routes>
			</Router>

			<ToastContainer />
		</div>
	);
}

export default App;
