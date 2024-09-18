import React from 'react';
import { Box, Typography, IconButton, Badge, Tooltip } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { notifications } from './noti';

export default function noti() {
    
    
      return (
        
          
    <>
          {/* Notification List */}
          <Box
            sx={{
              position: 'absolute',
              right: 0,
              width: '100%',
              p: 2,
              display: notifications.length > 0 ? 'block' : 'none',
            }}
          >
            {notifications.map((notification) => (
              <Box key={notification.id} sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                <EventAvailableIcon color="action" sx={{ mr: 1 }} />
                <Typography variant="body2">{notification.message}</Typography>
              </Box>
            ))}
          </Box>
          </>
      );
    }
