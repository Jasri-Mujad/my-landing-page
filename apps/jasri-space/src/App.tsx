import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import AboutPage from './pages/AboutPage';
import AdminLoginPage from './pages/AdminLoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './layouts/AdminLayout';
import DashboardHome from './pages/admin/DashboardHome';
import AdminProjectsPage from './pages/admin/AdminProjectsPage';
import AdminFeedsPage from './pages/admin/AdminFeedsPage';
import AdminMoodPage from './pages/admin/AdminMoodPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';
import AdminPlaylistPage from './pages/admin/AdminPlaylistPage';
import AdminProfilePage from './pages/admin/AdminProfilePage';
import AdminCommandCenterPage from './pages/admin/AdminCommandCenterPage';


const MainLayoutWrapper = () => (
  <MainLayout>
    <Outlet />
  </MainLayout>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayoutWrapper />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Route>
        <Route path="/admin" element={<AdminLoginPage />} />
        <Route path="/admin/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/admin/reset-password" element={<ResetPasswordPage />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/dashboard" element={<DashboardHome />} />
            <Route path="/dashboard/projects" element={<AdminProjectsPage />} />
            <Route path="/dashboard/feeds" element={<AdminFeedsPage />} />
            <Route path="/dashboard/mood" element={<AdminMoodPage />} />
            <Route path="/dashboard/playlist" element={<AdminPlaylistPage />} />
            <Route path="/dashboard/profile" element={<AdminProfilePage />} />
            <Route path="/dashboard/command-center" element={<AdminCommandCenterPage />} />
            <Route path="/dashboard/settings" element={<AdminSettingsPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
