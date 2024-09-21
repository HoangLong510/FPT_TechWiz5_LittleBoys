import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Alert,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Input,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import { getProjectDetailApi, updateProjectApi } from "./service";
import { useDispatch, useSelector } from "react-redux";
import { setPopup } from "~/libs/features/popup/popupSlice";

export default function ProjectDetail() {
  const { t } = useTranslation();
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.value);

  const [project, setProject] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(""); // Sử dụng category để lấy name của danh mục
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Danh mục có sẵn để lựa chọn
  const categories = [
    { id: 1, name: "Living room" },
    { id: 2, name: "Bedroom" },
    { id: 3, name: "Kitchen" },
    { id: 4, name: "Bathroom" },
    { id: 5, name: "Office" },
    { id: 6, name: "Outdoor Space" },
  ];

  // Fetch dữ liệu project chi tiết
  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      try {
        const res = await getProjectDetailApi(projectId);
        if (res && res.data) {
          const { name, description, image } = res.data;

          setProject(res.data);
          setName(name || "");
          setDescription(description || "");
          setCategory(res.data.categories || ""); // Đảm bảo category có giá trị cũ
          setImage(image || "");
        } else {
          setError("Project not found.");
        }
      } catch (err) {
        setError("Failed to fetch project details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  // Lưu dự án
  const handleSave = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    const MAX_FILE_SIZE = 2 * 1024 * 1024;

    if (image && image.size && image.size > MAX_FILE_SIZE) {
      setError("The image size must not exceed 2 MB.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("categories", category); // Đảm bảo gửi category đã chọn

    if (image && image instanceof File) {
      formData.append("image", image);
    }

    try {
      const res = await updateProjectApi(projectId, formData);
      if (res.success) {
        setSuccess(true);
        dispatch(setPopup({ type: "success", message: res.message }));
        navigate("/designer/projects");
      } else {
        setError(res.message);
        dispatch(setPopup({ type: "error", message: res.message }));
      }
    } catch (error) {
      console.error(
        "Error details:",
        error.response ? error.response.data : error
      );
      setError("Failed to update project.");
      dispatch(
        setPopup({ type: "error", message: "Failed to update project." })
      );
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Helmet>
        <title>
          {import.meta.env.VITE_PROJECT_NAME} | {t("ProjectDetail")}
        </title>
      </Helmet>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          userSelect: "none",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "40px",
          }}
        >
          <Box sx={{ fontWeight: "bold" }}>{t("ProjectDetail")}</Box>
          <Button onClick={() => navigate("/designer/projects")}>
            {t("View all projects")}
          </Button>
        </Box>

        {loading && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "400px",
            }}
          >
            <CircularProgress />
          </Box>
        )}

        {!loading && project && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
            }}
          >
            {success && (
              <Alert severity="success" sx={{ marginBottom: 2 }}>
                {t("Project updated successfully!")}
              </Alert>
            )}

            {error && (
              <Alert severity="error" sx={{ marginBottom: 2 }}>
                {error}
              </Alert>
            )}

            {/* Hiển thị hình ảnh cũ nếu có */}
            {project.image && (
              <Box sx={{ mb: 2 }}>
                <img
                  src={project.image}
                  alt="Project"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "200px",
                    objectFit: "contain",
                  }}
                />
              </Box>
            )}

            <TextField
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              label={t("Project Name")}
              variant="standard"
            />

            <TextField
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              label={t("Description")}
              variant="standard"
            />
            <FormControl fullWidth variant="standard">
              <InputLabel>{t("Category")}</InputLabel>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                label={t("Category")}
              >
                {categories.map((cat) => (
                  <MenuItem key={cat.id} value={cat.name}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              inputProps={{ accept: "image/*" }}
              fullWidth
              margin="none"
              sx={{ marginTop: 2 }}
            />

            <Box sx={{ width: "100%", padding: "5px 0px", gap: "10px" }}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSave}
                disabled={loading}
              >
                {t("Save")}
              </Button>
              <Button
                fullWidth
                variant="outlined"
                color="secondary"
                onClick={handleBack}
              >
                {t("Back")}
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
}
