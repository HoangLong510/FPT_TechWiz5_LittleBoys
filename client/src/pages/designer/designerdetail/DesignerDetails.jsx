import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
} from "@mui/material";
import { getDesignerInfoApi, getDesignerProjectsApi } from "./service";

export default function DesignDetails() {
  const { userId } = useParams();
  const [designerInfo, setDesignerInfo] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchDesignerDetails = async () => {
      try {
        const designerResponse = await getDesignerInfoApi(userId); // userId từ URL
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

  return (
    <Container maxWidth="lg">
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
                      designerInfo.contact.email || "Email not available"
                    }
                    secondary="Email"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={designerInfo.contact.phone}
                    secondary="Phone"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={designerInfo.contact.address}
                    secondary="Address"
                  />
                </ListItem>
              </List>
              <Button
                variant="outlined"
                onClick={() => setContactDialogOpen(true)}
              >
                Contact / Request Quote
              </Button>
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
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            label="Phone"
            type="tel"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            label="Message"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
        </DialogContent>
        <Button onClick={() => setContactDialogOpen(false)}>Cancel</Button>
        <Button
          onClick={() => {
            /* Handle send message */
          }}
        >
          Send
        </Button>
      </Dialog>
    </Container>
  );
}
