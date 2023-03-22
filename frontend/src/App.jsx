import Login from "./components/Login";
import Register from "./components/Register";
import StudHome from "./components/StudentHome";
import Home from "./components/Home"
import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FacultyHome from "./components/FacultyHome";
import CreateQuest from "./components/CreateQuest";
// import ExamSolving from "./components/ExamSolving";

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
					<Route
						exact
						path="/facultyHome"
						element={<FacultyHome />}
					/>
					<Route
						exact
						path="/createQuest"
						element={<CreateQuest />}
					/>
					{/* <Route
						exact
						path="/examSolving"
						element={<ExamSolving />}
					/> */}
					<Route
						exact
						path="/"
						element={<Home />}
					/>
				</Routes>
			</Router>

			<ToastContainer />
		</div>
	);
}

export default App;
