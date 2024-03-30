// import { Fragment } from "react";

import { Fragment } from "react/jsx-runtime";
import AdminLayout from "./components/layouts/admin";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/admin/dashboard";
import AccountsPage from "./pages/admin/accounts";
import AnalyticsPage from "./pages/admin/analytics";
import FilesPage from "./pages/admin/files";
import InboxPage from "./pages/admin/inbox";
import SchedulePage from "./pages/admin/schedule";
import SearchPage from "./pages/admin/search";
import SettingPage from "./pages/admin/setting";
import UserLayout from "./components/layouts/user";
import HomePage from "./pages/user/home";
import LoginPage from "./pages/user/login";
import RegisterPage from "./pages/user/register";
import AccountPage from "./pages/user/account";
import ContactPage from "./pages/user/contact";
import AboutPage from "./pages/user/about";
import ServicePage from "./pages/user/service";

const App = () => {
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/service" element={<ServicePage />} />
          </Route>

          <Route path="/admin" element={<AdminLayout />}>
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
