import Login from "./components/Login";
import Signup from "./components/Signup";
import StudHome from "./components/StudentHome"
import "./styles/App.css";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link
  } from "react-router-dom";

function App() {
	return <div>
	<Router>
    	<Routes>
          <Route exact path="/login"  element={<Login/>}></Route>
      	</Routes>
		  <Routes>
          <Route exact path="/signup"  element={<Signup/>}></Route>
      	</Routes>
		<Routes>
		  <Route exact path="/"  element={<StudHome/>}></Route>
      	</Routes>
    </Router>
	</div>;
}

export default App;
