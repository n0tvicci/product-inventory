import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PaidIcon from "@mui/icons-material/Paid";
import { useCallback } from "react";

export default function ReportBox({ products }) {
  const total_store_value = useCallback(() => {
    const array = [];
    products?.map((item) => {
      const { price, quantity } = item;
      const productValue = price * quantity;

      return array.push(productValue);
    });
    const totalValue = array.reduce((a, b) => {
      return a + b;
    }, 0);

    return totalValue.toFixed(2);
  }, [products]);

  const out_of_stock = useCallback(() => {
    const array = [];
    products?.map((item) => {
      const { quantity } = item;

      return array.push(quantity);
    });
    let count = 0;
    array.forEach((number) => {
      if (number === 0 || number === "0") {
        count += 1;
      }
    });

    return count;
  }, [products]);

  return (
    <Box sx={{ m: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Paper
            elevation={5}
            sx={{ p: 2, display: "flex", alignItems: "center", gap: 5 }}
          >
            <ShoppingCartIcon />
            <Box>
              <Typography variant="h6">Total Product</Typography>
              <Typography variant="h5">{products.length}</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper
            elevation={5}
            sx={{ p: 2, display: "flex", alignItems: "center", gap: 5 }}
          >
            <PaidIcon />
            <Box>
              <Typography variant="h6">Total Store Value</Typography>
              <Typography variant="h5">P{total_store_value()}</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper
            elevation={5}
            sx={{ p: 2, display: "flex", alignItems: "center", gap: 5 }}
          >
            <ShoppingCartIcon />
            <Box>
              <Typography variant="h6">Out of Stock</Typography>
              <Typography variant="h5">{out_of_stock()}</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
