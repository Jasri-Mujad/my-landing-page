import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './Sidebar.css'

function Sidebar() {
    const { logout } = useAuth()

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <span className="sidebar-logo">⚙️</span>
                <span className="sidebar-title">Admin Panel</span>
            </div>

            <nav className="sidebar-nav">
                <NavLink to="/admin/dashboard" className="sidebar-link">
                    <span className="sidebar-icon">📊</span>
                    Dashboard
                </NavLink>
                <NavLink to="/admin/feeds" className="sidebar-link">
                    <span className="sidebar-icon">📝</span>
                    Feeds
                </NavLink>
                <NavLink to="/admin/projects" className="sidebar-link">
                    <span className="sidebar-icon">📁</span>
                    Projects
                </NavLink>
                <NavLink to="/admin/mood" className="sidebar-link">
                    <span className="sidebar-icon">🎵</span>
                    Current Mood
                </NavLink>
            </nav>

            <div className="sidebar-footer">
                <button onClick={logout} className="sidebar-link logout-btn">
                    <span className="sidebar-icon">🚪</span>
                    Logout
                </button>
            </div>
        </aside>
    )
}

export default Sidebar
