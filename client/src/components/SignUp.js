import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';


const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    gender: '',
    heardAbout: [],
    city: '',
    state: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox'
        ? (checked ? [...prevData[name], value] : prevData[name].filter((item) => item !== value))
        : value,
    }));
  };
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/signup', formData);
      console.log(response.data);
      toast.success('New user created!');
      navigate('/signin');
    } catch (error) {
      console.error('Error submitting data:', error);
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
          <label>Name</label>
          <input type="text" className="form-control" name="name" onChange={handleChange} pattern="[A-Za-z ]+" required />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" className="form-control" name="email" onChange={handleChange} pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$" required />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" name="password" onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input type="tel" className="form-control" name="phone" onChange={handleChange} pattern="[0-9]{10}" required />
        </div>

        <div className="form-group">
          <label>Gender</label>
          <div className="form-check">
            <input type="radio" className="form-check-input" name="gender" value="male" onChange={handleChange} required />
            <label className="form-check-label">Male</label>
          </div>
          <div className="form-check">
            <input type="radio" className="form-check-input" name="gender" value="female" onChange={handleChange} required />
            <label className="form-check-label">Female</label>
          </div>
          <div className="form-check">
            <input type="radio" className="form-check-input" name="gender" value="others" onChange={handleChange} required />
            <label className="form-check-label">Others</label>
          </div>
        </div>

        <div className="form-group">
          <label>How did you hear about this?</label>
          <div className="form-check">
          <input type="radio" className="form-check-input" name="heardAbout" value="LinkedIn" onChange={handleChange} />
          <label className="form-check-label">LinkedIn</label>
        </div>
        <div className="form-check">
          <input type="radio" className="form-check-input" name="heardAbout" value="Friends" onChange={handleChange} />
          <label className="form-check-label">Friends</label>
        </div>
          <div className="form-check">
            <input type="radio" className="form-check-input" name="heardAbout" value="Job Portal" onChange={handleChange} />
            <label className="form-check-label">Job Portal</label>
          </div>
          <div className="form-check">
            <input type="radio" className="form-check-input" name="heardAbout" value="Others" onChange={handleChange} />
            <label className="form-check-label">Others</label>
          </div>
        </div>

        <div className="form-group">
          <label>City</label>
          <select className="form-control" name="city" onChange={handleChange}>
            <option>Mumbai</option>
            <option>Pune</option>
            <option>Ahmedabad</option>
          </select>
        </div>

        <div className="form-group">
          <label>State</label>
          <input type="text" className="form-control" name="state" list="states" onChange={handleChange} />
          <datalist id="states">
            <option value="Gujarat" />
            <option value="Maharashtra" />
            <option value="Karnataka" />
          </datalist>
        </div>

        <button type="submit" className="btn btn-primary mt-3">Register</button>
        <p className="Already registered text-right mt-">
            Already registered <a href="/signin">sign in?</a>
        </p>
      </form>
    </div>
  );
};

export default SignUp;