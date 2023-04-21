import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FacultyHome from "./components/FacultyHome";
import CreateQuest from "./components/CreateQuest";
import ExamSolving from "./components/ExamSolving";
import ExamCreated from "./components/ExamCreated";
import ExamAttempted from "./components/ExamAttempted";
import FacultyMarks from "./components/FacultyMarks";

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
					<Route
						exact
						path="/examSolving"
						element={<ExamSolving />}
					/>
					<Route
						exact
						path="/examCreated"
						element={<ExamCreated />}
					/>
					<Route
						exact
						path="/examAttempted"
						element={<ExamAttempted />}
					/>
					<Route
						exact
						path="/facultyMarks"
						element={<FacultyMarks/>}
					/>
					<Route
						exact
						path="/"
						element={<Home />}
					/>
					<Route
						exact
						path="*"
						element={<Home />}
					/>
				</Routes>
			</Router>

			<ToastContainer />
		</div>
	);
}

export default App;
