import { useState, ChangeEvent } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Typography,
  TextField,
  DialogActions,
  Box,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { auth } from '../firebase';

interface Form {
  email: string;
  password: string;
}

interface AuthModalProps {
  onClose: () => void;
}

function AuthModal({ onClose }: AuthModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [isSignIn, SetIsSigIn] = useState(true);
  const [form, setForm] = useState<Form>({
    email: '',
    password: '',
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setForm((oldForm) => ({
      ...oldForm,
      [event.target.name]: event.target.value,
    }));

  const handleAuth = async () => {
    setLoading(true);
    try {
      if (isSignIn) {
        await auth.signInWithEmailAndPassword(form.email, form.password);
      } else {
        await auth.createUserWithEmailAndPassword(form.email, form.password);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        setLoading(false);
      }
    }
  };

  let buttonContent: JSX.Element;

  if (loading) {
    buttonContent = <CircularProgress size={22} color="secondary" />;
  } else if (isSignIn) {
    buttonContent = <span>Login</span>;
  } else {
    buttonContent = <span>Sign Up</span>;
  }

  return (
    <Dialog open fullWidth onClose={onClose}>
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          {isSignIn ? 'Login' : 'Sign Up'}
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <TextField
          style={{ marginBottom: '24px' }}
          value={form.email}
          name="email"
          onChange={handleChange}
          label="Email"
          fullWidth
          variant="filled"
        />
        <TextField
          type="password"
          value={form.password}
          name="password"
          onChange={handleChange}
          label="Password"
          fullWidth
          variant="filled"
        />
        <Box mt={2} color="red">
          <Typography>{error}</Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Box
          width="100%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
          mx={2}
        >
          <Typography onClick={() => SetIsSigIn((o) => !o)}>
            {isSignIn ? "Don't have an account?" : 'Already have an account'}
          </Typography>
          <Button
            disableElevation
            variant="contained"
            color="primary"
            onClick={handleAuth}
            disabled={loading}
          >
            {buttonContent}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
}

export default AuthModal;
