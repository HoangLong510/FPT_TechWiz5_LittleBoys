import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Typography, Grid, Box, Button } from "@mui/material";
import { motion } from "framer-motion";

const categories = [
  { id: "living-room", name: "Living Room" },
  { id: "bedroom", name: "Bedroom" },
  { id: "kitchen", name: "Kitchen" },
  { id: "bathroom", name: "Bathroom" },
  { id: "office", name: "Office" },
  { id: "outdoor", name: "Outdoor Spaces" },
];

const projects = [
  {
    id: 1,
    name: "Modern Living Room",
    category: "living-room",
    designer: "Linh con cho",
    image: "/placeholder.jpg",
  },
  {
    id: 2,
    name: "Cozy Bedroom Retreat",
    category: "bedroom",
    designer: "Linh con cho",
    image: "/placeholder.jpg",
  },
  {
    id: 3,
    name: "Sleek Kitchen Design",
    category: "kitchen",
    designer: "Linh con cho",
    image: "/placeholder.jpg",
  },
  {
    id: 4,
    name: "Luxurious Bathroom",
    category: "bathroom",
    designer: "Linh con cho",
    image: "/placeholder.jpg",
  },
  {
    id: 5,
    name: "Productive Home Office",
    category: "office",
    designer: "Linh con cho",
    image: "/placeholder.jpg",
  },
  {
    id: 6,
    name: "Serene Outdoor Patio",
    category: "outdoor",
    designer: "Linh con cho",
    image: "/placeholder.jpg",
  },
];

export default function ProjectDetail() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("latest");

  const filteredProjects = projects.filter(
    (project) =>
      (project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === "" || project.category === selectedCategory)
  );

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortOrder === "asc") return a.name.localeCompare(b.name);
    if (sortOrder === "desc") return b.name.localeCompare(a.name);
    return b.id - a.id; // 'latest' sort
  });

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      {/* Video Section */}
      <Box
        className="video-section"
        sx={{
          position: "relative",
          overflow: "hidden",
          height: "80vh",
          backgroundImage: "url('/video/blog-df.png')",
        }}
      >
        <video
          className="video-background"
          autoPlay
          loop
          muted
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        >
          <source src="/video/video2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <Box
          className="video-overlay"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "white",
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              gutterBottom
              sx={{
                fontWeight: "bold",
                textShadow: "2px 2px 4px rgba(0,0,0,1)",
              }}
            >
              Project Detail
            </Typography>
            <Typography
              variant="h7"
              align="center"
              paragraph
              sx={{ textShadow: "1px 1px 2px rgba(0,0,0,1)" }}
            >
              Explore our projects and find your own style. Choose products
              designed to suit your desires. Because the more you, the more
              extraordinary.
            </Typography>
          </Container>
        </Box>
      </Box>
      <Container maxWidth="lg" sx={{ my: 6 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="/Images/bg/blogdetail3.jpg"
              alt="Featured Image"
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: "8px",
              }}
            />
          </Grid>

          {/* Content on the Right */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="h4"
              component="h2"
              fontWeight="bold"
              gutterBottom
            >
              Tên của Designed
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Thông tin dự án
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Thời gian tạo dự án
            </Typography>
            <Button
              component={Link}
              to={`/supplier/detail`}
              rel="noopener noreferrer"
              variant="outlined"
              size="large"
              sx={{
                borderColor: "#333",
                color: "#333",
                textTransform: "none",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#fff",
                  borderColor: "#333",
                },
              }}
            >
              Designed Detail
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
}
