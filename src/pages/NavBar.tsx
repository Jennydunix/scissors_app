/* eslint-disable react/function-component-definition */
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
// import LinkOffSharpIcon from '@mui/icons-material/LinkOffSharp';
import React from 'react';
import { auth } from '../firebase';

const NavBar: React.FC = () => {
  return (
    <AppBar elevation={0} color="secondary" position="static">
      <Toolbar>
        <img src="/Vector.svg" alt="" />
        <Typography variant="h6">|SCISSOR</Typography>
        <Box ml="auto">
          <Button color="inherit" variant="text">
            Links
          </Button>
          <Button onClick={() => auth.signOut()} color="inherit" variant="text">
            LogOut
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
