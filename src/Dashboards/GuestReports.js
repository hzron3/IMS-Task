import React from 'react';
import { Typography, Box } from '@mui/material';

export default function GuestReports() {
  return (
    <div className="container-fluid p-4">
      <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2C3E50', mb: 4 }}>
        Reports
      </Typography>
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" color="text.secondary">
          Reports Section - Coming Soon
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Downloadable reports for various stakeholder needs
        </Typography>
      </Box>
    </div>
  );
} 