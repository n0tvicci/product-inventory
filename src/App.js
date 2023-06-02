import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../src/utils/theme";

import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

import UserLayout from "./components/UserLayout";
import Dashboard from "./pages/dashboard";
import AddProduct from "./pages/products/AddProduct";
import EditProduct from "./pages/products/EditProduct";

import { Logout } from "./pages/Logout";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/dashboard"
            element={
              <UserLayout>
                <Dashboard />
              </UserLayout>
            }
          />
          <Route
            path="/add-product"
            element={
              <UserLayout>
                <AddProduct />
              </UserLayout>
            }
          />
          <Route
            path="/edit-product/:id"
            element={
              <UserLayout>
                <EditProduct />
              </UserLayout>
            }
          />

          <Route path="/logout" element={<Logout />}></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
