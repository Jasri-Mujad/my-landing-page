import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'

// Public pages
import HomePage from './pages/HomePage'
import ProjectsPage from './pages/ProjectsPage'

// Admin pages
import LoginPage from './pages/admin/LoginPage'
import AdminLayout from './pages/admin/AdminLayout'
import DashboardPage from './pages/admin/DashboardPage'
import FeedsPage from './pages/admin/FeedsPage'
import AdminProjectsPage from './pages/admin/AdminProjectsPage'
import MoodPage from './pages/admin/MoodPage'
import ProtectedRoute from './components/admin/ProtectedRoute'

import './index.css'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<LoginPage />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="feeds" element={<FeedsPage />} />
            <Route path="projects" element={<AdminProjectsPage />} />
            <Route path="mood" element={<MoodPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
