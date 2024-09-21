import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import { motion } from "framer-motion";

const categories = [
  { id: "living-room", name: "Living Room" },
  { id: "bedroom", name: "Bedroom" },
  { id: "dining-room", name: "Dining Room" },
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
    name: "Sleek Dining-room Design",
    category: "dining-room",
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

export default function Gallery() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("latest");
  const [expandedProject, setExpandedProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

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
    <Container maxWidth="xl" sx={{ mt: 4, mb: -6 }}>
      <Box
        sx={{
          backgroundImage: `url('/Images/bg/room-1336497.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "600px",
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
            future projects.​
          </Typography>
        </Container>
      </Box>

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
                whileHover={{ scale: 1.05 }} // Phóng to nhẹ khi hover
                whileTap={{ scale: 0.95 }} // Thu nhỏ nhẹ khi nhấp chuột
                transition={{ duration: 0.3 }} // Hiệu ứng mượt mà trong 0.3s
              >
                <Link to="/project/detail" style={{ textDecoration: "none" }}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="400"
                      image={`${import.meta.env.VITE_BACKEND_URL}/storage/${
                        project.image
                      }`}
                      alt={project.name}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="div">
                        {project.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {
                          categories.find((c) => c.id === project.category)
                            ?.name
                        }
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      )}

      <Container maxWidth="lg" sx={{ my: 6 }}>
        <Grid container spacing={4} alignItems="center">
          {/* video on the Left */}
          <Grid item xs={12} md={6}>
            <Box
              component="video"
              src="/video/video1.mp4" // Thay thế bằng đường dẫn tới video của bạn
              autoPlay
              loop
              muted //tắt âm thanh
              alt="Featured Video"
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
              What we offer
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              "Established with the mission of bringing sophisticated and modern
              living spaces, DecorVista is a pioneer brand in the field of
              interior design. With unique and diverse collections, we bring
              optimal solutions to all customer needs, from family living spaces
              to large commercial projects. At DecorVista, we not only provide
              high-end interior products, but also offer flexible customization,
              making each project unique and reflecting the individual
              personality of the customer. Join us in creating a classy living
              space with inspiring and creative interior design collections."
            </Typography>

            <Button
              component={Link}
              to={`/product`}
              rel="noopener noreferrer"
              variant="outlined"
              size="large"
              sx={{
                borderColor: "#333",
                color: "#333",
                textTransform: "none",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                  borderColor: "#333",
                },
              }}
            >
              Discover Now
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
}
