import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import { getProjectsApi } from "./service";

const categories = [
  { id: "living-room", name: "Living Room" },
  { id: "bedroom", name: "Bedroom" },
  { id: "dining-room", name: "Dining Room" },
  { id: "bathroom", name: "Bathroom" },
  { id: "office", name: "Office" },
  { id: "outdoor", name: "Outdoor Spaces" },
];

export default function Gallery() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("latest");
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getProjectsApi({
          search: searchTerm,
          sort: sortOrder,
          filterCategory: selectedCategory,
        });
        console.log("Fetched Projects:", response);
        if (response.success) {
          setProjects(response.data);
        } else {
          setProjects([]);
        }
        setLoading(false);
      } catch (error) {
        console.error("Failed to load projects:", error);
        setLoading(false);
      }
    };
    fetchProjects();
  }, [searchTerm, sortOrder, selectedCategory]);

  const goToProjectDetail = (projectId) => {
    navigate(`/projects/${projectId}`);
  };

  // Lọc dự án theo từ khóa tìm kiếm và danh mục
  const filteredProjects = Array.isArray(projects)
    ? projects.filter(
        (project) =>
          (project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.category
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) &&
          (selectedCategory === "" || project.category === selectedCategory)
      )
    : [];

  // Sắp xếp dự án
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortOrder === "asc") return a.name.localeCompare(b.name);
    if (sortOrder === "desc") return b.name.localeCompare(a.name);
    return b.id - a.id; // Sắp xếp theo 'latest'
  });

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 0 }}>
      <Box
        sx={{
          backgroundImage: `url('/Images/bg/room-1336497.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          textShadow: "2px 2px 5px rgba(0,0,0,1)",
          boxShadow: "inset 0 0 0 1000px rgba(0, 0, 0, 0.3)",
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
            Gallery
          </Typography>
          <Typography
            variant="h7"
            align="center"
            paragraph
            sx={{ textShadow: "1px 1px 2px rgba(0,0,0,1)" }}
          >
            Explore our collection of projects to get inspiration for your
            future projects.​{" "}
          </Typography>
        </Container>
      </Box>

      {/* Form tìm kiếm và sắp xếp */}
      <Grid container spacing={2} sx={{ mb: 4, mt: 2 }}>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Search projects"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={selectedCategory}
              label="Category"
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>Sort by</InputLabel>
            <Select
              value={sortOrder}
              label="Sort by"
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <MenuItem value="latest">Latest</MenuItem>
              <MenuItem value="asc">A-Z</MenuItem>
              <MenuItem value="desc">Z-A</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Hiển thị project */}
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            height: "200px",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {sortedProjects.map((project) => (
            <Grid item key={project.id} xs={12} sm={6} md={4}>
              <motion.div
                whileHover={{ scale: 1.05 }} // Hiệu ứng phóng to khi hover
                whileTap={{ scale: 0.95 }} // Hiệu ứng thu nhỏ khi nhấp chuột
                transition={{ duration: 0.3 }} // Hiệu ứng mượt mà
              >
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    marginBottom: "50px",
                  }}
                >
                  <CardMedia
                    sx={{}}
                    component="img"
                    height="400"
                    src={`${project.image}?${new Date().getTime()}`}
                    alt={project.name}
                    onClick={() => goToProjectDetail(project.id)}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="div">
                      {project.name}
                    </Typography>

                    {/* Hiển thị categories */}
                    <Typography variant="body2" color="text.secondary">
                      {project.categories
                        ? project.categories
                        : "No categories"}
                    </Typography>

                    {/* Hiển thị description */}
                    {project.description && (
                      <Typography variant="body2" color="text.secondary">
                        {project.description}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
