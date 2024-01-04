import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';


const EditUser = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    gender: '',
    heardAbout: '',
    city: '',
    state: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/dashboard/getuser/${id}`);
        const {data} = response;
        if(response.status === 422 || !data){
          console.error('Error fetching user data');
        }
        else{
          setFormData(data);
          console.log("Fetched user data successfully");
        }
      } catch (error) {
        console.log('Error fetching user data:',error);
      }
    };
    fetchUserData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox'
        ? (checked ? value : '')
        : value,
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:8000/dashboard/edituser/${id}`, formData);
      if (response.status === 422 || !response.data) {
        console.log("Error updating user data");
      } else {
        console.log("User data updated successfully");
        toast.success('User data updated successfully');
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error updating data:', error);
      toast.error('Error updating user data');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input type="text" className="form-control" name="name" onChange={handleChange} value={formData.name} pattern="[A-Za-z ]+" required />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" className="form-control" name="email" onChange={handleChange} value={formData.email} pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$" required />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" name="password" onChange={handleChange} value={formData.password} required />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input type="tel" className="form-control" name="phone" onChange={handleChange} value={formData.phone} pattern="[0-9]{10}" required />
        </div>

        <div className="form-group">
          <label>Gender</label>
          <div className="form-check">
            <input type="radio" className="form-check-input" name="gender" value="male" onChange={handleChange} checked={formData.gender === 'male'} required />
            <label className="form-check-label">Male</label>
          </div>
          <div className="form-check">
            <input type="radio" className="form-check-input" name="gender" value="female" onChange={handleChange} checked={formData.gender === 'female'} required />
            <label className="form-check-label">Female</label>
          </div>
          <div className="form-check">
            <input type="radio" className="form-check-input" name="gender" value="others" onChange={handleChange} checked={formData.gender === 'others'} required />
            <label className="form-check-label">Others</label>
          </div>
        </div>

        <div className="form-group">
          <label>How did you hear about this?</label>
          <div className="form-check">
          <input type="radio" className="form-check-input" name="heardAbout" value="LinkedIn" onChange={handleChange} checked={formData.heardAbout === 'LinkedIn'} />
          <label className="form-check-label">LinkedIn</label>
        </div>
        <div className="form-check">
          <input type="radio" className="form-check-input" name="heardAbout" value="Friends" onChange={handleChange} checked={formData.heardAbout === 'Friends'} />
          <label className="form-check-label">Friends</label>
        </div>
          <div className="form-check">
            <input type="radio" className="form-check-input" name="heardAbout" value="Job Portal" onChange={handleChange} checked={formData.heardAbout === 'Job Portal'} />
            <label className="form-check-label">Job Portal</label>
          </div>
          <div className="form-check">
            <input type="radio" className="form-check-input" name="heardAbout" value="Others" onChange={handleChange} checked={formData.heardAbout === 'Others'} />
            <label className="form-check-label">Others</label>
          </div>
        </div>

        <div className="form-group">
          <label>City</label>
          <select className="form-control" name="city" onChange={handleChange} value={formData.city}>
            <option>Mumbai</option>
            <option>Pune</option>
            <option>Ahmedabad</option>
          </select>
        </div>

        <div className="form-group">
          <label>State</label>
          <input type="text" className="form-control" name="state" list="states" onChange={handleChange} value={formData.state} />
          <datalist id="states">
            <option value="Gujarat" />
            <option value="Maharashtra" />
            <option value="Karnataka" />
          </datalist>
        </div>

        <button type="submit" className="btn btn-primary mt-2">Update</button>
      </form>
    </div>
  );
}

export default EditUser;
