import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useUser } from '../context/useContext'; 

function Register() {
  const { setUser } = useUser(); 
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    reEnteredPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const switchpage = () => {
    navigate('/login');
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
  
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = 'This field is required';
      }
    });
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
  
    if (formData.password !== formData.reEnteredPassword) {
      newErrors.reEnteredPassword = 'Passwords do not match';
    }
  
    setErrors(newErrors);
  
    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await axios.post('http://localhost:8080/register', formData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const { user } = response.data;
        console.log('User Data:', user);
        setUser(user); 
        console.log('Response:', response);
        setError('Registration Successfull!');
        navigate('/dashboard');
  
      } catch (error) {
        console.error('Error:', error);
      }
    }      
  };
  

  return (
    <div className="flex justify-center items-center h-full">
      <Card className="mt-6" color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray" className="text-center">
          Register As An Admin
        </Typography>
        <Typography color="gray" className="mt-1 text-center font-normal">
          Sign up with your details to register.
        </Typography>
        <form onSubmit={handleSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-6 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Name
            </Typography>
            <Input
              size="lg"
              placeholder="Enter your name"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
            {errors.fullName && <Typography color="red">{errors.fullName}</Typography>}
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Email
            </Typography>
            <Input
              size="lg"
              placeholder="Enter your email"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <Typography color="red">{errors.email}</Typography>}
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Phone Number
            </Typography>
            <Input
              size="lg"
              placeholder="Enter your phone number"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            {errors.phoneNumber && <Typography color="red">{errors.phoneNumber}</Typography>}
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>
            <Input
              size="lg"
              placeholder="Enter your password"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <Typography color="red">{errors.password}</Typography>}
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Re-Enter Password
            </Typography>
            <Input
              size="lg"
              placeholder="Re-enter your password"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              type="password"
              name="reEnteredPassword"
              value={formData.reEnteredPassword}
              onChange={handleChange}
            />
            {errors.reEnteredPassword && <Typography color="red">{errors.reEnteredPassword}</Typography>}
          </div>
          <Button className="mt-6" fullWidth type="submit">
            Register
          </Button>
          {error && <Typography color="red" className="mt-4 text-center font-normal">{error}</Typography>}

          <Typography color="gray" className="mt-4 text-center font-normal">
          Already have an account?{" "}
          <Button className="font-medium text-white" onClick={switchpage}>
            Sign In
          </Button>
        </Typography>
        </form>
      </Card>
    </div>
  );
}

export default Register;
