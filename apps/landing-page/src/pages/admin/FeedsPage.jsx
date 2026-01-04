import { useState } from 'react'
import { mockFeeds } from '../../services/api'
import './ManagementPage.css'

function FeedsPage() {
    const [feeds, setFeeds] = useState(mockFeeds)
    const [editingId, setEditingId] = useState(null)
    const [formData, setFormData] = useState({ title: '', content: '' })
    const [showForm, setShowForm] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()

        if (editingId) {
            // Update existing
            setFeeds(feeds.map(f =>
                f.id === editingId
                    ? { ...f, ...formData }
                    : f
            ))
        } else {
            // Create new
            const newFeed = {
                id: Date.now(),
                ...formData,
                createdAt: new Date().toISOString().split('T')[0]
            }
            setFeeds([newFeed, ...feeds])
        }

        resetForm()
    }

    const handleEdit = (feed) => {
        setFormData({ title: feed.title, content: feed.content })
        setEditingId(feed.id)
        setShowForm(true)
    }

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this feed?')) {
            setFeeds(feeds.filter(f => f.id !== id))
        }
    }

    const resetForm = () => {
        setFormData({ title: '', content: '' })
        setEditingId(null)
        setShowForm(false)
    }

    return (
        <div className="management-page">
            <header className="admin-header">
                <h1 className="admin-title">
                    <span>📝</span>
                    Manage Feeds
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
                    <h3>{editingId ? 'Edit Feed' : 'New Feed'}</h3>
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
                            <label className="form-label">Content</label>
                            <textarea
                                className="form-textarea"
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                required
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
                {feeds.map((feed) => (
                    <div key={feed.id} className="item-card card">
                        <div className="item-content">
                            <h4>{feed.title}</h4>
                            <p>{feed.content}</p>
                            <span className="item-date">{feed.createdAt}</span>
                        </div>
                        <div className="item-actions">
                            <button
                                className="btn btn-secondary btn-sm"
                                onClick={() => handleEdit(feed)}
                            >
                                ✏️ Edit
                            </button>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDelete(feed.id)}
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

export default FeedsPage
