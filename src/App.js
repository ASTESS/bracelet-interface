import logo from './logo.svg';
import './App.css';
import Login from "./Pages/Login";
import OverView from "./Pages/OverView";
import {
    BrowserRouter as Router,
    Route,
    Routes
} from "react-router-dom";

function App() {
  return (
    <div className="App">
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/overview" element={<OverView />} />
            </Routes>
        </Router>

    </div>
  );
}

export default App;
