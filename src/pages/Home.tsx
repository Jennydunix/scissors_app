/* eslint-disable react/function-component-definition */
import { Box, Button, Grid, Hidden, Typography } from '@mui/material';
import { useState } from 'react';
import AuthModal from './AuthModal';

const Home: React.FC = () => {
  const [openAuthModal, setOpenAuthModal] = useState(false);
  return (
    <Box
      display="flex"
      flexDirection="column"
      p={3}
      boxSizing="border-box"
      height="100vh"
    >
      {openAuthModal && <AuthModal onClose={() => setOpenAuthModal(false)} />}
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h4" color="blue">
          Scissors
        </Typography>
        <Button onClick={() => setOpenAuthModal(true)} color="inherit">
          Login/Signup
        </Button>
      </Box>

      <Box display="flex" flexGrow={1} alignItems="center">
        <Grid container alignItems="center">
          <Grid item sm={6}>
            <Box>
              <Typography variant="h3">Let&apos;s Scissor it</Typography>
              <Box my={2}>
                <Typography>
                  Powerful link shortner to help your brand to grow
                </Typography>
              </Box>
              <Button
                onClick={() => setOpenAuthModal(true)}
                disableElevation
                variant="contained"
                size="large"
              >
                Get Started
              </Button>
            </Box>
          </Grid>
          <Hidden only="xs">
            <Grid item sm={6}>
              <img
                style={{
                  width: '100%',
                  height: '50%',
                  borderRadius: '10px',
                  boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.1)',
                }}
                src="/src/assets/mockup.png"
                alt="mockup"
              />
            </Grid>
          </Hidden>
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;
