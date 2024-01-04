import React, { useEffect, useState } from 'react';
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ViewUser = () => {
  const [getuserdata, setGetUserData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/dashboard/getuser/${id}`);
        setGetUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, [id]);

  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/deleteuser/${getuserdata._id}`);
      toast.success('User deleted successfully');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Error deleting user');
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="container mt-3">
      <h1 style={{ fontWeight: 400 }}>Welcome {getuserdata.name}</h1>
      <Card sx={{ maxWidth: 600, boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)' }}>
        <CardContent>
        <div className="add_btn" style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <NavLink to={`/dashboard/edituser/${getuserdata._id}`}>
        <button className="btn btn-primary mx-1" style={{ cursor: 'pointer', transition: 'background-color 0.3s' }}>
          <CreateIcon />
        </button>
      </NavLink>
      <button
        className="btn btn-danger"
        onClick={handleDelete}
        style={{ cursor: 'pointer', transition: 'background-color 0.3s' }}
      >
        <DeleteOutlineIcon />
      </button>
    </div>
          <div className="row">
            <div className="left_view col-lg-6 col-md-6 col-12 mt-2">
              <img src="/profile.png" style={{ width: 50 }} alt="profile" />
              <h3 className="mt-3" style={{ fontSize: '21px' }}>
                Name: <span style={{ fontWeight: 400 }}>{getuserdata.name}</span>
              </h3>
              <p className="mt-3" style={{ fontWeight: 600 }}>
                <MailOutlineIcon />Email: <span style={{ fontWeight: 400 }}>{getuserdata.email}</span>
              </p>
            </div>
            <div className="right_view col-lg-6 col-md-6 col-12">
              <p className="mt-5" style={{ fontWeight: 600 }}>
                <PhoneAndroidIcon />Mobile: <span style={{ fontWeight: 400 }}>+91 {getuserdata.phone}</span>
              </p>
              <p className="mt-3" style={{ fontWeight: 600 }}>
                <LocationOnIcon />Location: <span style={{ fontWeight: 400 }}>{getuserdata.city}, {getuserdata.state}</span>
              </p>
    
            </div>
          </div>
          <ToastContainer />
        </CardContent>
      </Card>
    </div>
  );
};


export default ViewUser;