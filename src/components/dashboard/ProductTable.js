// ** React Imports
import { useState } from "react";

// ** MUI Imports
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import { Button, Stack } from "@mui/material";
import swal from "sweetalert";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

import ViewProduct from "../products/ViewProduct";
import ProductStore from "../../zustand/ProductStore";

const columns = [
  { id: "name", label: "Name" },
  { id: "unit", label: "Unit" },
  {
    id: "price",
    label: "Price",
  },
  { id: "expirationDate", label: "Expiration Date" },
  { id: "quantity", label: "Available Inventory" },
  { id: "inventoryCost", label: "Available Inventory Cost" },
  {
    id: "createdOn",
    label: "Created On",
  },
  {
    id: "action",
    label: "Action",
  },
];

const ProductTable = ({ rows }) => {
  const navigate = useNavigate();
  // ** States
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const deleteProduct = ProductStore((state) => state.deleteProduct);
  const getProducts = ProductStore((state) => state.getProducts);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDeleteClick = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this product!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const initialize = async () => {
          try {
            await deleteProduct(id);
            swal("Good job!", `Product successfully deleted`, "success");
            await getProducts();
          } catch (error) {
            swal("Oops!", `${error.message}`, "error");
          }
        };
        initialize();
      }
    });
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={"center"}
                  sx={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                const formattedDate = new Date(
                  row.createdAt
                ).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                });

                const expiredDate = new Date(
                  row.expirationDate
                ).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                });

                const inventoryCost = row.price * row.quantity;

                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                    <TableCell component="th" scope="row" align="center">
                      {row.name}
                    </TableCell>
                    <TableCell align="center">{row.unit}</TableCell>
                    <TableCell align="center">
                      P{row.price.toFixed(2)}
                    </TableCell>
                    <TableCell align="center">{expiredDate}</TableCell>
                    <TableCell align="center">{row.quantity}</TableCell>
                    <TableCell align="center">
                      P{inventoryCost.toFixed(2)}
                    </TableCell>
                    <TableCell align="center">{formattedDate}</TableCell>
                    <TableCell align="center">
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{ display: "flex", justifyContent: "center" }}
                      >
                        <ViewProduct id={row._id} />
                        <Button
                          variant="contained"
                          color="info"
                          onClick={() => navigate(`/edit-product/${row._id}`)}
                        >
                          <EditIcon />
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleDeleteClick(row._id)}
                        >
                          <DeleteIcon />
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default ProductTable;
