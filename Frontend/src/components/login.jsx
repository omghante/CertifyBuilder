import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/useContext'; 
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";

const Login = () => {
  const { setUser } = useUser(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const switchpage = () => {
    navigate('/register');
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/login', { email, password });
      if (response.data.success) {
        const { user } = response.data;
        console.log('User Data:', user);
        setUser(user); 
        console.log('Login Successful!');
        navigate('/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError('Error logging in');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card style={{ width: '320px', padding: '20px', textAlign: 'center' }}>
        <Typography variant="h4" color="primary" gutterBottom>
          Login
        </Typography>
        <div style={{ marginBottom: '20px' }}>
          <Typography variant="h6" color="primary" gutterBottom>
            Email
          </Typography>
          <Input
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginBottom: '10px' }}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <Typography variant="h6" color="primary" gutterBottom>
            Password
          </Typography>
          <Input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginBottom: '10px' }}
          />
        </div>
        <Button variant="contained" color="primary" onClick={handleLogin} style={{ width: '100%', marginBottom: '10px' }}>
          Login
        </Button>
        {error && <Typography color="error">{error}</Typography>}
          
        <Typography color="gray" className="mt-4 text-center font-normal">
          Dosen't have an account?{" "}
          <Button className="font-medium text-white" onClick={switchpage}>
            Register
          </Button>
        </Typography>
      </Card>
    </div>
  );
};

export default Login;