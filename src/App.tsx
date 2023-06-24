/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/function-component-definition */
import { ThemeProvider, CircularProgress, Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import {
  Routes,
  Route,
  Navigate,
  BrowserRouter,
  useLocation,
} from 'react-router-dom';
import Home from './pages/Home';
import Account from './pages/Account';
import theme from './theme';
import { auth } from './firebase';
import LinkRedirect from './pages/LinkRedirect';

export const App: React.FC = () => {
  const [user, setUser] = useState<unknown | null>(null);
  const { pathname } = useLocation();
  const [initialLoad, setInitialLoad] = useState(
    !!(pathname === '/' || pathname === '/account')
  );

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      setInitialLoad(false);
    });
  }, []);

  if (initialLoad) {
    return (
      <Box mt={5} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/account" /> : <Home />}
        />
        <Route
          path="/account"
          element={user ? <Account /> : <Navigate to="/" />}
        />
        <Route path="/:shortCode" element={<LinkRedirect />} />
      </Routes>
    </ThemeProvider>
  );
};

export function WrappedApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
