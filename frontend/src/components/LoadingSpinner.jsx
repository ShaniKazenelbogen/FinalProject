import React from 'react';
import { Heart } from 'lucide-react';
import { Box, Typography, keyframes } from '@mui/material';

const heartbeat = keyframes`
  0% {
    transform: scale(1);
  }
  14% {
    transform: scale(1.3);
  }
  28% {
    transform: scale(1);
  }
  42% {
    transform: scale(1.3);
  }
  70% {
    transform: scale(1);
  }
`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export default function LoadingSpinner({ message = "Loading..." }) {
  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center" 
      p={8}
      sx={{ minHeight: '200px' }}
    >
      <Box 
        sx={{ 
          position: 'relative',
          width: 60,
          height: 60,
          marginBottom: 2
        }}
      >
        {/* Steady outer circle */}
        <Box
          sx={{
            width: 60,
            height: 60,
            border: '3px solid #e3f2fd',
            borderRadius: '50%',
            position: 'absolute',
          }}
        />
        
        {/* Spinning progress circle */}
        <Box
          sx={{
            width: 60,
            height: 60,
            border: '3px solid transparent',
            borderTop: '3px solid #2196f3',
            borderRadius: '50%',
            position: 'absolute',
            animation: `${spin} 1s linear infinite`,
          }}
        />
        
        {/* Animated heart in center */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            animation: `${heartbeat} 1.5s ease-in-out infinite`,
          }}
        >
          <Heart 
            size={24} 
            style={{ 
              color: '#e91e63',
              fill: '#e91e63'
            }} 
          />
        </Box>
      </Box>
      
      <Typography 
        variant="body2" 
        color="text.secondary"
        sx={{ textAlign: 'center' }}
      >
        {message}
      </Typography>
    </Box>
  );
}