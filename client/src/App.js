import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import EditUser from './components/EditUser';
import ViewUser from './components/ViewUser';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/getuser/:id" element={<ViewUser />} />
        <Route path="/dashboard/edituser/:id" element={<EditUser />} />
        <Route path="/" element={<Navigate to="/signin" />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
