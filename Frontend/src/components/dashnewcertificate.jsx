import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/useContext';
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";

function DashboardNewCertificate() { 
  const { user } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    adminName: user ? user.fullname : "",
    fullName: "",
    email: "",
    phoneNumber: "",
    selectedCourse: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:8080/certificate', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Response:', response);
      const data = response.data;
      console.log('Data:', data);
      alert("Certificate Generated Successfully");
      
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card color="transparent" shadow={false} className="w-80 max-w-screen-lg sm:w-96">
        <Typography variant="h4" color="blue-gray">
          New Certificate
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Fill in the details to create a new certificate.
        </Typography>
        <form onSubmit={handleSubmit} className="mt-8 mb-2">
          <div className="mb-6 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Admin Name
            </Typography>
            <Input
              size="lg"
              placeholder="Admin Name"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              name="adminName"
              value={formData.adminName}
              onChange={handleChange}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Full Name (For Certificate)
            </Typography>
            <Input
              size="lg"
              placeholder="Full Name"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Email
            </Typography>
            <Input
              size="lg"
              placeholder="Email"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Phone Number
            </Typography>
            <Input
              size="lg"
              placeholder="Phone Number"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Select Course (For Certificate)
            </Typography>
            <select
              className="bg-white border border-gray-300 rounded-lg px-3 py-2 mt-1 block w-full"
              name="selectedCourse"
              value={formData.selectedCourse}
              onChange={handleChange}
            >
              <option value="">Select a course</option>
              <option value="C">C</option>
              <option value="C++">C++</option>
              <option value="Java">Java</option>
              <option value="Python">Python</option>
              <option value="DSA">DSA</option>
              <option value="MERN Stack">MERN Stack</option>
              <option value="Web Development">Web Development</option>
              <option value="Android Development">Android Development</option>
            </select>
          </div>
          <Button className="mt-6" fullWidth type="submit">
            Create Certificate
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default DashboardNewCertificate;
