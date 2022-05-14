import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import View from "./components/Preview";
import Dashboard from "./components/Dashboard";
import EditMarkdown from "./components/EditMarkdown";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/view" element={<View />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/edit/:markdownId" element={<EditMarkdown />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
