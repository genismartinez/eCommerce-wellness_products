// LoginPage.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MaterialUITextField, MaterialUIButton, MaterialUITypography, MaterialUIContainer, MaterialUIGrid } from '../MaterialUI/MaterialUI';
import {login} from "../services/services";
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await login(formData.username, formData.password)
    localStorage.setItem('user', response.email);
    navigate('/products')
    console.log(formData);
  };

  return (
    <MaterialUIContainer component="main" maxWidth="xs">
      <div>
        <MaterialUITypography component="h1" variant="h5">
          Login Page
        </MaterialUITypography>
        <form onSubmit={handleSubmit}>
          <MaterialUIGrid container spacing={2}>
            <MaterialUIGrid item xs={12}>
              <MaterialUITextField 
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </MaterialUIGrid>
            <MaterialUIGrid item xs={12}>
              <MaterialUITextField 
                variant="outlined"
                required
                fullWidth
                type="password"
                id="password"
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </MaterialUIGrid>
          </MaterialUIGrid>
          <MaterialUIButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Login
          </MaterialUIButton>
        </form>
        <MaterialUIGrid container justifyContent="flex-end">
          <MaterialUIGrid item>
            <MaterialUITypography variant="body2">
              Don't have an account? <Link to="/register">Register</Link>
            </MaterialUITypography>
          </MaterialUIGrid>
        </MaterialUIGrid>
      </div>
    </MaterialUIContainer>
  );
}

export default Login;
