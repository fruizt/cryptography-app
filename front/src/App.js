
import "./App.scss"
import Navbar from "./components/Navbar";
import SideBar1 from "./components/sideBar1";
import Sidebar from "./components/SideBar";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
	return (
		<Router>
			<div className="App">
				{/* <Navbar /> */}
				<SideBar1/>
				<div className="flex"></div>
				  <Sidebar />
          <div className="content">

          </div>
				<header className="App-header">
					<p>texto</p>
				</header>
			</div>
		</Router>
	);
}

export default App;
