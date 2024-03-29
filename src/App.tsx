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

// function App() {
//   return;
//   <Fragment></Fragment>;
// }

// export default App;

const App = () => {
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<FrontLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/account" element={<AccountPage />} />
          </Route> */}

          {/* <Route
            path="/"
            element={
              isAuthenticated && user?.role === "admin" ? (
                <AdminLayout />
              ) : (
                <Navigate to="/" />
              )
            }
          >
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="skills" element={<SkillsPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="experiences" element={<ExperiencesPage />} />
            <Route path="education" element={<EducationPage />} />
            <Route path="portfolios" element={<PortfoliosPage />} />
          </Route> */}

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
