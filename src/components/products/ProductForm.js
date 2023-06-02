import React from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export default function ProductForm({
  selectedFile,
  handleDrop,
  handleFileInputChange,
  values,
  handleSubmit,
  handleInputChange,
  expirationDate,
  handleExpirateDate,
}) {
  const navigate = useNavigate();
  const { id } = useParams();

  const rootProps = {
    onDrop: handleDrop,
    onDragOver: (event) => event.preventDefault(),
    onDragEnter: (event) => event.preventDefault(),
    onDragLeave: (event) => event.preventDefault(),
    sx: {
      p: 3,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      borderColor: "grey.400",
      borderWidth: "2px",
      borderStyle: "dashed",
      borderRadius: "5px",
      backgroundColor: selectedFile ? "transparent" : "grey.100",
      color: selectedFile ? "inherit" : "text.secondary",
      "&:hover": {
        backgroundColor: selectedFile ? "transparent" : "grey.200",
      },
    },
  };
  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Box
        sx={{ p: 3, cursor: "pointer", display: "inline-flex" }}
        onClick={() => navigate("/dashboard")}
      >
        <ArrowBackIcon />
      </Box>
      <Typography variant="h5" style={{ textAlign: "center" }}>
        {!id ? "Enter Product Details" : "Update Product Details"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={1} sx={{ p: 1 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Product Name"
              value={values?.name}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="unit"
              name="unit"
              label="Unit"
              value={values?.unit}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="price"
              name="price"
              label="Price"
              type="number"
              value={values?.price}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Select Date"
                value={expirationDate}
                onChange={(newValue) => handleExpirateDate(newValue)}
                renderInput={(params) => <TextField {...params} />}
                sx={{ width: "100%" }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="quantity"
              name="quantity"
              label="Available Inventory"
              type="number"
              value={values?.quantity}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <label htmlFor="file-input">
              <Paper {...rootProps}>
                {selectedFile ? (
                  <Box sx={{ display: "Flex", flexDirection: "column" }}>
                    <Typography
                      variant="subtitle1"
                      sx={{ textAlign: "center" }}
                    >
                      {selectedFile.name || selectedFile.fileName}
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <img
                        src={
                          selectedFile.filePath ||
                          URL.createObjectURL(selectedFile)
                        }
                        alt="uploaded"
                        style={{ width: "200px", height: "auto" }}
                      />
                    </Box>
                  </Box>
                ) : (
                  <Stack alignItems="center" justifyContent="center">
                    <CloudUploadIcon fontSize="large" />
                    <Typography variant="subtitle1">
                      Drag and Drop here or Click to Upload
                    </Typography>
                  </Stack>
                )}
              </Paper>
              <input
                id="file-input"
                type="file"
                accept=".jpg,.png,.jpeg"
                style={{ display: "none" }}
                onChange={handleFileInputChange}
              />
            </label>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={2} direction="row">
              <Button variant="contained" type="submit">
                {id ? "Update" : "Submit"}
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}
