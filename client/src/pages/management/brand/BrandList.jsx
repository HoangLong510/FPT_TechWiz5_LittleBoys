import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Pagination,
  Stack,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getSupplierApi, changeSupplierRoleApi } from "./service"; // Thêm API đổi vai trò
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { setPopup } from "~/libs/features/popup/popupSlice";

export default function SupplierList() {
  const dispatch = useDispatch();
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedSupplierId, setSelectedSupplierId] = useState(null);
  const navigate = useNavigate();

  const fetchSuppliers = async () => {
    setLoading(true);
    try {
      const data = { search, page };
      const res = await getSupplierApi(data);
      if (res.suppliers) {
        setSuppliers(res.suppliers);
        setTotalPage(res.totalPages);
        setPage(res.currentPage);
      }
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, [search, page]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleOpenDialog = (supplierId) => {
    setSelectedSupplierId(supplierId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleChangeRole = async () => {
    setOpenDialog(false);
    setLoading(true);

    try {
      const res = await changeSupplierRoleApi(selectedSupplierId);
      if (res && res.success) {
        dispatch(setPopup({ type: "success", message: res.message }));
        fetchSuppliers();
        navigate("/management/suppliers");
      } else {
        dispatch(setPopup({ type: "error", message: res.message }));
      }
    } catch (error) {
      console.error(
        "Error details:",
        error.response ? error.response.data : error
      );
      dispatch(
        setPopup({
          type: "error",
          message:
            "Failed to change supplier role and delete products. Please try again.",
        })
      );
    } finally {
      setLoading(false);
    }
  };

  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>
          {import.meta.env.VITE_PROJECT_NAME} | {t("ManagementSuppliers")}
        </title>
      </Helmet>

      <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "40px",
          }}
        >
          <Box sx={{ fontWeight: "bold" }}>{t("SUPPLIERMANAGEMENT")}</Box>
        </Box>

        <TextField
          fullWidth
          size="small"
          id="search"
          label={t("Search")}
          variant="outlined"
          autoComplete="off"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <TableContainer
          component={Paper}
          sx={{
            border: "1px solid #e6e6e6",
            boxShadow: "none",
            maxHeight: "400px",
            overflow: "auto",
          }}
        >
          <Table sx={{ minWidth: 650, fontSize: "14px" }}>
            <TableHead>
              <TableRow
                sx={{ textTransform: "uppercase", backgroundColor: "#000" }}
              >
                <TableCell sx={{ color: "#fff", width: "15%" }}>
                  {t("ID")}
                </TableCell>
                <TableCell sx={{ color: "#fff", width: "40%" }}>
                  {t("Name")}
                </TableCell>
                <TableCell sx={{ color: "#fff", width: "25%" }}>
                  {t("Image")}
                </TableCell>
                <TableCell sx={{ color: "#fff", width: "20%" }}>
                  {t("Created At")}
                </TableCell>
                <TableCell sx={{ color: "#fff", width: "10%" }}>
                  {t("Action")}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!loading &&
                suppliers.length > 0 &&
                suppliers.map((supplier) => (
                  <TableRow
                    key={supplier.id}
                    sx={{
                      "&:last-child td, &:last-child th": {
                        border: 0,
                        borderBottom: "1px solid #e6e6e6",
                      },
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                        cursor: "pointer",
                      },
                    }}
                  >
                    <TableCell sx={{ fontSize: "14px" }}>
                      {supplier.id}
                    </TableCell>
                    <TableCell sx={{ fontSize: "14px" }}>
                      {supplier.fullname}
                    </TableCell>
                    <TableCell sx={{ fontSize: "14px" }}>
                      {supplier.image ? (
                        <img
                          src={supplier.image}
                          alt={supplier.fullname}
                          style={{
                            width: "100px",
                            height: "80px",
                            objectFit: "cover",
                          }}
                          onError={() =>
                            console.log("Failed to load image:", supplier.image)
                          }
                        />
                      ) : (
                        "No image"
                      )}
                    </TableCell>
                    <TableCell sx={{ fontSize: "14px" }}>
                      {supplier.created_at}
                    </TableCell>
                    <TableCell sx={{ fontSize: "14px" }}>
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenDialog(supplier.id);
                        }}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              {!loading && suppliers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No data
                  </TableCell>
                </TableRow>
              )}
              {loading && (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ display: "flex", justifyContent: "end", width: "100%" }}>
          <Stack spacing={2}>
            <Pagination
              count={totalPage}
              page={page}
              onChange={handleChangePage}
              color="primary"
            />
          </Stack>
        </Box>
      </Box>

      {/* Dialog xác nhận */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm role change"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to change this supplier to user and delete all
            their products?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleChangeRole} color="error" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
