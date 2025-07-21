import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import { NoteState } from './components/ContextNote';
import SignIn from './components/signIn';
import SignUp from './components/SignUp';
import Notes from './components/Notes'; // Make sure to import your Notes component
import NoteDetail from './components/NoteDetail'; // Import the new NoteDetail component

function App() {
  return (
    <NoteState> 
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/notes" element={<Notes />} /> {/* Route for notes list */}
            <Route path="/note/:id" element={<NoteDetail />} /> {/* Route for single note view */}
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
          </Routes>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;