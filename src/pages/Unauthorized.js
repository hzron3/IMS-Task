import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Container } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
          gap: 3
        }}
      >
        <LockIcon sx={{ fontSize: 80, color: '#e74c3c' }} />
        
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#2C3E50' }}>
          Access Denied
        </Typography>
        
        <Typography variant="h6" component="h2" sx={{ color: '#7f8c8d', mb: 2 }}>
          You don't have permission to access this page
        </Typography>
        
        <Typography variant="body1" sx={{ color: '#95a5a6', mb: 4 }}>
          Please contact your administrator if you believe this is an error.
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Button
            variant="contained"
            onClick={() => navigate('/')}
            sx={{
              background: 'linear-gradient(135deg, #2C3E50 0%, #1ABC9C 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #34495e 0%, #16a085 100%)'
              }
            }}
          >
            Go to Home
          </Button>
          
          <Button
            variant="outlined"
            onClick={() => navigate('/login')}
            sx={{
              borderColor: '#1ABC9C',
              color: '#1ABC9C',
              '&:hover': {
                borderColor: '#16a085',
                backgroundColor: 'rgba(26, 188, 156, 0.04)'
              }
            }}
          >
            Login Again
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Unauthorized; 