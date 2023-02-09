import "./App.css";
import Repositories from "./components/Repositories";
import Commits from "./components/Commits";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router basename="/Netflix-repo">
        <Routes>
          <Route exact path="/" element={<Repositories />} />
          <Route exact path="/commits/:id" element={<Commits />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
