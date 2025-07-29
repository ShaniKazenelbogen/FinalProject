import React, { useEffect } from 'react';
import { Alert, Snackbar } from '@mui/material';

const Notification = ({ open, message, severity = 'success', onClose, autoHideDuration = 4000 }) => {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onClose();
      }, autoHideDuration);
      return () => clearTimeout(timer);
    }
  }, [open, autoHideDuration, onClose]);

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        variant="filled"
        sx={{
          width: '100%',
          fontSize: '1rem',
          fontWeight: 500,
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          borderRadius: '8px'
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
