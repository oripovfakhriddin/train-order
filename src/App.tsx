import { useContext } from "react";
import { Fragment } from "react/jsx-runtime";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import AdminLayout from "./components/layouts/admin";
import UserLayout from "./components/layouts/user";
import { AuthContext } from "./context/auth";
import AdminAccountsPage from "./pages/admin/accounts";
import DashboardPage from "./pages/admin/dashboard";
import AdminOrdersPage from "./pages/admin/orders";
import AdminUsersPage from "./pages/admin/users";
import AdminWagonsPage from "./pages/admin/wagons";
import AccountPage from "./pages/user/account";
import HomePage from "./pages/user/home";
import LoginPage from "./pages/user/login";
import UserOrderPage from "./pages/user/order";
import RegisterPage from "./pages/user/register";
import MySingleOrderPage from "./pages/user/single-order";
import UserWagonPage from "./pages/user/wagon";

const App = () => {
  const { isAuthenticated, user } = useContext(AuthContext);

  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
          <Route path="/" element={<UserLayout />}>
            <Route index element={<HomePage />} />

            <Route
              path="/order"
              element={
                isAuthenticated ? <UserOrderPage /> : <Navigate to={"/login"} />
              }
            />
            <Route
              path="/account"
              element={
                isAuthenticated ? <AccountPage /> : <Navigate to={"/login"} />
              }
            />
            <Route path="/wagon" element={<UserWagonPage />} />
            <Route
              path="/my-single-order"
              element={
                isAuthenticated ? (
                  <MySingleOrderPage />
                ) : (
                  <Navigate to={"/login"} />
                )
              }
            />
          </Route>

          <Route
            path="/admin"
            element={
              isAuthenticated && user?.role === "ADMIN" ? (
                <AdminLayout />
              ) : (
                <Navigate to="/login" />
              )
            }
          >
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="accounts" element={<AdminAccountsPage />} />
            <Route path="users" element={<AdminUsersPage />} />
            <Route path="wagons" element={<AdminWagonsPage />} />
            <Route path="orders" element={<AdminOrdersPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
};
export default App;
