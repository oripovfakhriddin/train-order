import { useContext } from "react";
import { Fragment } from "react/jsx-runtime";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import AdminLayout from "./components/layouts/admin";
import UserLayout from "./components/layouts/user";
import { AuthContext } from "./context/auth";
import AccountsPage from "./pages/admin/accounts";
import AnalyticsPage from "./pages/admin/analytics";
import DashboardPage from "./pages/admin/dashboard";
import FilesPage from "./pages/admin/files";
import InboxPage from "./pages/admin/inbox";
import SchedulePage from "./pages/admin/schedule";
import SearchPage from "./pages/admin/search";
import SettingPage from "./pages/admin/setting";
import AccountPage from "./pages/user/account";
import HomePage from "./pages/user/home";
import LoginPage from "./pages/user/login";
import RegisterPage from "./pages/user/register";
import TrainPage from "./pages/user/train";

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

            <Route path="/account" element={<AccountPage />} />
            <Route path="/train" element={<TrainPage />} />
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
            <Route path="accounts" element={<AccountsPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="files" element={<FilesPage />} />
            <Route path="inbox" element={<InboxPage />} />
            <Route path="schedule" element={<SchedulePage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="setting" element={<SettingPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
};
export default App;
