
import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import { NoteState } from './components/ContextNote'; // ✅ correct import

function App() {
  return (
    <NoteState> {/* ✅ Use Provider component */}
      <Router>
        <Navbar />
        <div className="container">
          {/* <Alert message={"this is Alert So attention please"} /> */}
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;
