import Login from "./components/Login";
import Signup from "./components/Signup";
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
    </Router>
	</div>;
}

export default App;
