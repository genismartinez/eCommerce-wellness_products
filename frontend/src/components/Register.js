// RegistrationPage.js

import React, { useState } from 'react';
import { MaterialUITextField, MaterialUIButton, MaterialUITypography, MaterialUIContainer, MaterialUIGrid } from '../MaterialUI/MaterialUI';
import {register} from "../services/services";
import {useNavigate} from "react-router-dom";
import { Snackbar, Alert } from '@mui/material';

function Registration() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData.username, formData.email, formData.password);
      navigate('/login');
    } catch (e) {
      console.error(e);
      setSnackbarMessage('Registration failed. Please try again.');
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
      <MaterialUIContainer component="main" maxWidth="xs">
        <MaterialUITypography variant="h5">Registration Page</MaterialUITypography>
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
                  id="email"
                  label="Email Address"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
              />
            </MaterialUIGrid>
            <MaterialUIGrid item xs={12}>
              <MaterialUITextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
              />
            </MaterialUIGrid>
          </MaterialUIGrid>
          <MaterialUIButton type="submit" fullWidth variant="contained" color="primary">
            Register
          </MaterialUIButton>
        </form>
        <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </MaterialUIContainer>
  );
}

export default Registration;
