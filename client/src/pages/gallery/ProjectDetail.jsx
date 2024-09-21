import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"; // Để lấy ID từ URL và điều hướng
import {
  Container,
  Typography,
  Grid,
  Box,
  Button,
  CircularProgress,
} from "@mui/material";
import { getProjectDetailApi } from "./service"; // Import API lấy chi tiết dự án

export default function ProjectDetail() {
  const { projectId } = useParams(); // Lấy projectId từ URL
  const [project, setProject] = useState(null); // Lưu thông tin dự án
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjectDetail = async () => {
      try {
        const response = await getProjectDetailApi(projectId);
        if (response.success) {
          setProject(response.data);
          console.log("Project Data:", response.data); // In dữ liệu dự án ra console
        }
        setLoading(false);
      } catch (error) {
        console.error("Failed to load project details:", error);
        setLoading(false);
      }
    };

    fetchProjectDetail();
  }, [projectId]);

  // Nếu đang load, hiển thị loader
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Nếu không tìm thấy dự án
  if (!project) {
    return (
      <Container maxWidth="lg">
        <Typography variant="h4">Project not found.</Typography>
      </Container>
    );
  }

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
              {project.name} {/* Đổ tên dự án */}
            </Typography>
            <Typography
              variant="h7"
              align="center"
              paragraph
              sx={{ textShadow: "1px 1px 2px rgba(0,0,0,1)" }}
            >
              Explore our project details and find your own style.
            </Typography>
          </Container>
        </Box>
      </Box>
      <Container maxWidth="lg" sx={{ my: 6 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={`${project.image}?${new Date().getTime()}`}
              alt={project.name}
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
              {project.name}
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              {project.description || "No description available"}{" "}
              {/* Đổ mô tả */}
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Category: {project.categories || "Uncategorized"}{" "}
              {/* Đổ categories */}
            </Typography>
            <Button
              component={Link}
              to={`/designer/detail/${project.user_id}`} // Sử dụng user_id từ project
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
              Designer Detail
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
}
