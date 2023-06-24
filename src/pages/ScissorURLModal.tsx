/* eslint-disable react/function-component-definition */
import React, { useState, ChangeEvent } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Button,
  TextField,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

interface ScissorURLModalProps {
  handleClose: () => void;
  createShortenLink: (name: string, longUrl: string) => void;
}

const ScissorURLModal: React.FC<ScissorURLModalProps> = ({
  handleClose,
  createShortenLink,
}) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<
    Partial<{ name: string; longUrl: string }>
  >({});
  const [form, setForm] = useState<{ name: string; longUrl: string }>({
    name: '',
    longUrl: '',
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setForm((oldForm) => ({
      ...oldForm,
      [event.target.name]: event.target.value,
    }));

  const handleSubmit = async () => {
    const validationErrors: { name?: string; longUrl?: string } = {};
    const tName = form.name.trim();
    const tLongUrl = form.longUrl.trim();

    const expression =
      // eslint-disable-next-line no-useless-escape
      /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    const regex = new RegExp(expression);

    if (tName.length < 3 || tName.length > 15) {
      validationErrors.name = 'The name should be min 3 and max 15 char long';
    }
    if (!regex.test(tLongUrl)) {
      validationErrors.longUrl = 'URL is not valid';
    }

    // eslint-disable-next-line no-extra-boolean-cast
    if (!!Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      setTimeout(() => createShortenLink(tName, tLongUrl), 1000);
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <Dialog open onClose={handleClose} fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          Shorten URL
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box mb={3}>
          <TextField
            error={!!errors.name}
            helperText={errors.name}
            value={form.name}
            name="name"
            onChange={handleChange}
            fullWidth
            variant="filled"
            label="Name"
          />
        </Box>
        <TextField
          error={!!errors.longUrl}
          helperText={errors.longUrl}
          value={form.longUrl}
          name="longUrl"
          onChange={handleChange}
          fullWidth
          variant="filled"
          label="Long URL"
        />
      </DialogContent>
      <DialogActions>
        <Box mr={2} my={1}>
          <Button
            onClick={handleSubmit}
            color="primary"
            variant="contained"
            disableElevation
            disabled={loading}
          >
            {loading ? (
              <CircularProgress color="secondary" size={22} />
            ) : (
              'Customize your URL'
            )}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default ScissorURLModal;
