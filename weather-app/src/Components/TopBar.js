import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';

//test push
const TopBar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#2196f3', boxShadow: 3 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* <img src={logo} alt="Logo" style={{ width: 50, height: 50, marginRight: 16 }} /> */}
          <Typography variant="h6" component="div">
            Weather App
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
