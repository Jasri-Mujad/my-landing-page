import { Link } from 'react-router-dom'
import { mockFeeds, mockProjects } from '../../services/api'
import '../admin/AdminLayout.css'

function DashboardPage() {
    return (
        <div className="dashboard-page">
            <header className="admin-header">
                <h1 className="admin-title">
                    <span>📊</span>
                    Dashboard
                </h1>
            </header>

            <div className="stat-cards">
                <div className="stat-card">
                    <div className="stat-card-header">
                        <span>📝</span>
                        Total Feeds
                    </div>
                    <div className="stat-card-value">{mockFeeds.length}</div>
                </div>

                <div className="stat-card">
                    <div className="stat-card-header">
                        <span>📁</span>
                        Total Projects
                    </div>
                    <div className="stat-card-value">{mockProjects.length}</div>
                </div>
            </div>

            <h3>Quick Actions</h3>
            <div className="quick-actions">
                <Link to="/admin/feeds" className="btn btn-primary">
                    + New Feed
                </Link>
                <Link to="/admin/projects" className="btn btn-secondary">
                    + New Project
                </Link>
                <Link to="/admin/mood" className="btn btn-secondary">
                    🎵 Update Mood
                </Link>
            </div>
        </div>
    )
}

export default DashboardPage
