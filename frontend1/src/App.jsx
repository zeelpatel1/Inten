import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import DocumentForm from './components/DocForm';
import DocumentDetails from './components/DocDetails';
import LandingPage from './components/LandingPage';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/document/:id" element={<DocumentDetails />} />
          <Route path="/document/new" element={<DocumentForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
