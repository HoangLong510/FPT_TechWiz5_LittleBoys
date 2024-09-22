import React, { useState, useEffect } from "react";
import { getMeetings, updateMeetingStatus } from "./service"; // Import service functions
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Select,
  MenuItem,
} from "@mui/material";

export default function Meetings() {
  const [meetings, setMeetings] = useState([]);
  const [updatedStatus, setUpdatedStatus] = useState({});

  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchMeetings = async () => {
    try {
      const response = await getMeetings();
      setMeetings(response.data);
    } catch (error) {
      console.error("Error fetching meetings:", error);
    }
  };

  const handleStatusChange = (id, status) => {
    setUpdatedStatus((prev) => ({ ...prev, [id]: status }));
  };

  const handleUpdate = async (id) => {
    const status = updatedStatus[id];
    if (status) {
      try {
        console.log("Payload:", { status }); // Kiểm tra payload trước khi gửi lên server
        const response = await updateMeetingStatus(id, { status });
        if (response.success) {
          alert("Status updated successfully!");
          fetchMeetings();
        } else {
          alert("Failed to update status: " + response.message);
        }
      } catch (error) {
        console.error("Error updating status:", error);
        alert("Failed to update status");
      }
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>User</TableCell>
            <TableCell>Scheduled At</TableCell>
            <TableCell>Message</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {meetings.map((meeting) => (
            <TableRow key={meeting.id}>
              <TableCell>{meeting.id}</TableCell>
              <TableCell>{meeting.user_fullname}</TableCell>
              <TableCell>{meeting.scheduled_at}</TableCell>
              <TableCell>{meeting.message}</TableCell>
              <TableCell>
                <Select
                  value={updatedStatus[meeting.id] || meeting.status}
                  onChange={(e) =>
                    handleStatusChange(meeting.id, e.target.value)
                  }
                  displayEmpty
                  fullWidth
                >
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="confirmed">Confirmed</MenuItem>
                  <MenuItem value="canceled">Canceled</MenuItem>
                </Select>
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleUpdate(meeting.id)}
                >
                  Update Status
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
