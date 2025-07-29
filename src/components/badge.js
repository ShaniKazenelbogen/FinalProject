import React from 'react';
import { Chip } from '@mui/material';

const Badge = ({ color, children }) => {
  return (
    <Chip
      label={children}
      style={{ backgroundColor: color, color: 'white' }}
    />
  );
};

export default Badge;