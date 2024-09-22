import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  CircularProgress,
  Box,
} from "@mui/material";
import { createMeetingApi, getDesignerInfoApi, getDesignerProjectsApi } from "./service";
import { useDispatch, useSelector } from "react-redux";
import { setPopup } from "~/libs/features/popup/popupSlice";

export default function DesignDetails() {
  const dispatch = useDispatch()

  const user = useSelector(state => state.user.value)
  const { userId } = useParams();
  const [designerInfo, setDesignerInfo] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [contactDialogOpen, setContactDialogOpen] = useState(false);


  const [scheduled, setScheduled] = useState("")
  const [message, setMessage] = useState("")

  useEffect(() => {
    const fetchDesignerDetails = async () => {
      try {
        const designerResponse = await getDesignerInfoApi(userId);
        setDesignerInfo(designerResponse.data);

        const projectsResponse = await getDesignerProjectsApi(userId);
        setProjects(projectsResponse.data);
      } catch (error) {
        console.error("Failed to load designer details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDesignerDetails();
  }, [userId]);

  if (loading) {
    return <CircularProgress />;
  }

  if (!designerInfo) {
    return <Typography variant="h4">Designer not found.</Typography>;
  }

  const handleCreateMeeting = async () => {
    const data = {
      designer_id: userId,
      date: scheduled,
      message
    }

    const res = await createMeetingApi(data)

    if (res.success) {
      const dataPopup = {
        type: "success",
        message: [{
          en: "Meeting scheduled successfully.",
          vi: "Lịch hẹn đã được tạo thành công."
        }]
      }
      dispatch(setPopup(dataPopup))
      setContactDialogOpen(false)
    } else {
      const dataPopup = {
        type: "error",
        message: [{
          vi: "Lỗi trong quá trình tạo cuộc hợp.",
          en: "An error occurred while creating the meeting."
        }]
      }
      dispatch(setPopup(dataPopup))
    }
  }

  return (
    <Container maxWidth="lg" sx={{ padding: '50px 20px' }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardMedia
              component="img"
              image={designerInfo.logo}
              alt={designerInfo.name}
            />
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {designerInfo.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {designerInfo.description}
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary={
                      designerInfo.email || "Email not available"
                    }
                    secondary="Email"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={designerInfo.phone}
                    secondary="Phone"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={designerInfo.address}
                    secondary="Address"
                  />
                </ListItem>
              </List>
              {user.exist && (
                <Button
                  variant="outlined"
                  onClick={() => setContactDialogOpen(true)}
                >
                  Contact / Request Quote
                </Button>
              )}
              {!user.exist && (
                <Link to='/auth/login'>
                  <Button variant="outlined">
                    Contact / Request Quote
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Typography variant="h4" gutterBottom>
            Projects
          </Typography>
          <Grid container spacing={2}>
            {projects.map((project) => (
              <Grid item xs={12} sm={6} md={4} key={project.id}>
                <Card>
                  <CardMedia
                    component="img"
                    image={project.image}
                    alt={project.name}
                  />
                  <CardContent>
                    <Typography variant="h6">{project.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {project.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      <Dialog
        open={contactDialogOpen}
        onClose={() => setContactDialogOpen(false)}
      >
        <DialogTitle>Contact / Request Quote</DialogTitle>
        <DialogContent>
          <TextField sx={{ m: '20px 0px' }}
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField sx={{ m: '20px 0px' }}
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
          />
          <TextField sx={{ m: '20px 0px' }}
            margin="dense"
            label="Phone"
            type="tel"
            fullWidth
            variant="outlined"
          />
          <TextField sx={{ m: '20px 0px' }}
            label="Scheduled"
            type="datetime-local"
            fullWidth
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min step for time picker
            }}
            value={scheduled}
            onChange={(e) => setScheduled(e.target.value)}
          />
          <TextField sx={{ m: '20px 0px' }}
            margin="dense"
            label="Message"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </DialogContent>
        <Button onClick={() => setContactDialogOpen(false)}>Cancel</Button>
        <Button
          onClick={() => {
            handleCreateMeeting()
          }}
        >
          Send
        </Button>
      </Dialog>
    </Container>
  );
}
