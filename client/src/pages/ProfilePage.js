import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Avatar,
  Grid,
  Divider,
  Alert,
} from '@mui/material';
import { Person, Save, Edit } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../redux/slices/authSlice';
import { showSnackbar } from '../redux/slices/uiSlice';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    userName: user?.userName || '',
    email: user?.email || '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error for this field
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.userName.trim()) {
      newErrors.userName = 'Username is required';
    } else if (formData.userName.length < 3) {
      newErrors.userName = 'Username must be at least 3 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (formData.password) {
      if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const updateData = {
      userName: formData.userName,
      email: formData.email,
    };

    if (formData.password) {
      updateData.password = formData.password;
    }

    try {
      await dispatch(updateProfile(updateData)).unwrap();
      dispatch(showSnackbar({ message: 'Profile updated successfully', severity: 'success' }));
      setIsEditing(false);
      setFormData({
        ...formData,
        password: '',
        confirmPassword: '',
      });
    } catch (error) {
      dispatch(showSnackbar({ message: 'Failed to update profile', severity: 'error' }));
    }
  };

  const handleCancel = () => {
    setFormData({
      userName: user?.userName || '',
      email: user?.email || '',
      password: '',
      confirmPassword: '',
    });
    setErrors({});
    setIsEditing(false);
  };

  return (
    <Box>
      <Box mb={4}>
        <Typography variant="h3" sx={{ color: 'white', fontWeight: 700, mb: 1 }}>
          My Profile
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
          Manage your account settings
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: 3,
              p: 3,
              textAlign: 'center',
            }}
          >
            <Avatar
              sx={{
                width: 120,
                height: 120,
                margin: '0 auto 16px',
                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                fontSize: 48,
                fontWeight: 700,
              }}
            >
              {user?.userName?.charAt(0).toUpperCase() || 'U'}
            </Avatar>
            <Typography variant="h5" sx={{ color: 'white', fontWeight: 600, mb: 1 }}>
              {user?.userName}
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              {user?.email}
            </Typography>
            <Divider sx={{ my: 3, borderColor: 'rgba(255, 255, 255, 0.2)' }} />
            <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
              Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card
            sx={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: 3,
              p: 3,
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography variant="h5" sx={{ color: 'white', fontWeight: 600 }}>
                Account Information
              </Typography>
              {!isEditing && (
                <Button
                  startIcon={<Edit />}
                  onClick={() => setIsEditing(true)}
                  sx={{ color: 'white' }}
                >
                  Edit Profile
                </Button>
              )}
            </Box>

            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Username"
                    name="userName"
                    value={formData.userName}
                    onChange={handleChange}
                    disabled={!isEditing}
                    error={!!errors.userName}
                    helperText={errors.userName}
                    InputLabelProps={{ sx: { color: 'rgba(255, 255, 255, 0.7)' } }}
                    InputProps={{ sx: { color: 'white' } }}
                    FormHelperTextProps={{ sx: { color: '#f44336' } }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    error={!!errors.email}
                    helperText={errors.email}
                    InputLabelProps={{ sx: { color: 'rgba(255, 255, 255, 0.7)' } }}
                    InputProps={{ sx: { color: 'white' } }}
                    FormHelperTextProps={{ sx: { color: '#f44336' } }}
                  />
                </Grid>

                {isEditing && (
                  <>
                    <Grid item xs={12}>
                      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.2)', my: 2 }} />
                      <Typography variant="subtitle2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 2 }}>
                        Change Password (optional)
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="New Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        error={!!errors.password}
                        helperText={errors.password || 'Leave blank to keep current password'}
                        InputLabelProps={{ sx: { color: 'rgba(255, 255, 255, 0.7)' } }}
                        InputProps={{ sx: { color: 'white' } }}
                        FormHelperTextProps={{ sx: { color: errors.password ? '#f44336' : 'rgba(255, 255, 255, 0.5)' } }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Confirm New Password"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword}
                        InputLabelProps={{ sx: { color: 'rgba(255, 255, 255, 0.7)' } }}
                        InputProps={{ sx: { color: 'white' } }}
                        FormHelperTextProps={{ sx: { color: '#f44336' } }}
                      />
                    </Grid>
                  </>
                )}
              </Grid>

              {isEditing && (
                <Box display="flex" gap={2} mt={4}>
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={<Save />}
                    disabled={loading}
                    sx={{
                      background: 'linear-gradient(45deg, rgba(147, 51, 234, 0.8), rgba(59, 130, 246, 0.8))',
                      '&:hover': {
                        background: 'linear-gradient(45deg, rgba(147, 51, 234, 0.9), rgba(59, 130, 246, 0.9))',
                      },
                    }}
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={handleCancel}
                    disabled={loading}
                    sx={{
                      color: 'white',
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                      '&:hover': {
                        borderColor: 'rgba(255, 255, 255, 0.5)',
                        background: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
              )}
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfilePage;
