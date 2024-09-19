import React, { useEffect, useState } from 'react';
import { Box, Typography, IconButton, Badge, Tooltip, List, ListItem, ListItemText } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { fetchActivityLogsApi } from './service'; // Đảm bảo đường dẫn đúng

export default function Notification() {
  const [activityLogs, setActivityLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getActivityLogs = async () => {
      try {
        const logs = await fetchActivityLogsApi();
        console.log('Fetched activity logs:', logs); // In logs ra console
        setActivityLogs(logs.data || []);
      } catch (error) {
        console.error('Error fetching activity logs:', error);
      } finally {
        setLoading(false);
      }
    };

    getActivityLogs();
  }, []);

  return (
    <Box>
      <Tooltip title="Notifications">
        <IconButton>
          <Badge badgeContent={activityLogs.length} color="primary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Tooltip>

      <Box mt={2}>
        <Typography variant="h6">Recent Activities</Typography>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          <List>
            {activityLogs.map((log) => (
              <ListItem key={log.id}>
                <ListItemText
                  primary={log.description}
                  secondary={new Date(log.created_at).toLocaleString()} // Hiển thị thời gian
                />
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Box>
  );
}
