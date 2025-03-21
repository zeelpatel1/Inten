import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Component/Navbar";
import LandingPage from "./Component/Landing";
import Login from "./Component/Login";  // <-- Import a proper login component
import Register from "./Component/Register";
import Dashboard from "./Component/Dashboard";
import CreateDocument from "./Component/CreateDocument";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/document/new" element={<CreateDocument/>}></Route>
      </Routes>
    </Router>
  );
};

export default App;
