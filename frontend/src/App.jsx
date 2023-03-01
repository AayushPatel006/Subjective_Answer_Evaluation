import Login from "./components/Login";
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
    </Router>
	</div>;
}

export default App;
