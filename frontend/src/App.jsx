import { Routes, Route, Link } from "react-router-dom";
import CreateEvent from "./CreateEvent";
import Register from "./Register";
import Admin from "./Admin";

function App() {
  return (
    <div>
      {/* Navigation */}
      <nav>
        <Link to="/">Home</Link>
        <Link to="/create-event">Create Event</Link>
        <Link to="/register">Register</Link>
        <Link to="/admin">Admin Dashboard</Link>
      </nav>

      {/* Page Container */}
      <div className="container">
        <Routes>
          <Route path="/" element={<h2>Welcome to Event Registration System</h2>} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
