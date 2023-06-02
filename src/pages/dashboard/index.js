import React from "react";
import { Box, Button } from "@mui/material";

import ReportBox from "../../components/dashboard/ReportBox";
import ProductTable from "../../components/dashboard/ProductTable";
import ProductStore from "../../zustand/ProductStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

export default function Dashboard() {
  const navigate = useNavigate();
  const getProducts = ProductStore((state) => state.getProducts);
  const products = ProductStore((state) => state.products);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getProducts();
      } catch (error) {
        console.log(`${error.message}`);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      {!products ? (
        <CircularProgress />
      ) : (
        <Box>
          <ReportBox products={products} />
          <Button
            variant="contained"
            sx={{ mb: 1 }}
            onClick={() => navigate("/add-product")}
          >
            Add Product
          </Button>
          <ProductTable rows={products} />
        </Box>
      )}
    </>
  );
}
