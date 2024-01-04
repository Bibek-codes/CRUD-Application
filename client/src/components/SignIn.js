import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:8000/signin', {
        email: formData.email,
        password: formData.password
      });
  
      if (response.data === "exist") {
        navigate('/dashboard');
      } else if (response.data === "notexist") {
        alert("User has not signed up");
      } else if (response.data === "passwordMismatch") {
        alert("Incorrect password. Please try again.");
      }
    } catch (error) {
      alert("Error checking email");
      console.error('Error checking email:', error);
    }
  };
  

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col text-center">
          <h2>Sign In</h2>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary mt-3">Sign In</button>

        <p className="mt-3">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}

export default SignIn;
