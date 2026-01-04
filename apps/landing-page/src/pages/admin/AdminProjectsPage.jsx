import { useState } from 'react'
import { mockProjects } from '../../services/api'
import './ManagementPage.css'

function AdminProjectsPage() {
    const [projects, setProjects] = useState(mockProjects)
    const [editingId, setEditingId] = useState(null)
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        repoLink: '',
        liveLink: ''
    })
    const [showForm, setShowForm] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()

        if (editingId) {
            setProjects(projects.map(p =>
                p.id === editingId
                    ? { ...p, ...formData }
                    : p
            ))
        } else {
            const newProject = {
                id: Date.now(),
                ...formData
            }
            setProjects([newProject, ...projects])
        }

        resetForm()
    }

    const handleEdit = (project) => {
        setFormData({
            title: project.title,
            description: project.description,
            repoLink: project.repoLink || '',
            liveLink: project.liveLink || ''
        })
        setEditingId(project.id)
        setShowForm(true)
    }

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            setProjects(projects.filter(p => p.id !== id))
        }
    }

    const resetForm = () => {
        setFormData({ title: '', description: '', repoLink: '', liveLink: '' })
        setEditingId(null)
        setShowForm(false)
    }

    return (
        <div className="management-page">
            <header className="admin-header">
                <h1 className="admin-title">
                    <span>📁</span>
                    Manage Projects
                </h1>
                <button
                    className="btn btn-primary"
                    onClick={() => setShowForm(true)}
                >
                    + Add New
                </button>
            </header>

            {showForm && (
                <div className="form-card card">
                    <h3>{editingId ? 'Edit Project' : 'New Project'}</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">Title</label>
                            <input
                                type="text"
                                className="form-input"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Description</label>
                            <textarea
                                className="form-textarea"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Repository Link (optional)</label>
                            <input
                                type="url"
                                className="form-input"
                                value={formData.repoLink}
                                onChange={(e) => setFormData({ ...formData, repoLink: e.target.value })}
                                placeholder="https://github.com/..."
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Live Link (optional)</label>
                            <input
                                type="url"
                                className="form-input"
                                value={formData.liveLink}
                                onChange={(e) => setFormData({ ...formData, liveLink: e.target.value })}
                                placeholder="https://..."
                            />
                        </div>
                        <div className="form-actions">
                            <button type="submit" className="btn btn-primary">
                                {editingId ? 'Update' : 'Create'}
                            </button>
                            <button type="button" className="btn btn-secondary" onClick={resetForm}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="items-list">
                {projects.map((project) => (
                    <div key={project.id} className="item-card card">
                        <div className="item-content">
                            <h4>{project.title}</h4>
                            <p>{project.description}</p>
                            <div className="item-links">
                                {project.repoLink && (
                                    <a href={project.repoLink} target="_blank" rel="noopener noreferrer">
                                        🔗 Repo
                                    </a>
                                )}
                                {project.liveLink && (
                                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                                        🌐 Live
                                    </a>
                                )}
                            </div>
                        </div>
                        <div className="item-actions">
                            <button
                                className="btn btn-secondary btn-sm"
                                onClick={() => handleEdit(project)}
                            >
                                ✏️ Edit
                            </button>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDelete(project.id)}
                            >
                                🗑️ Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AdminProjectsPage
