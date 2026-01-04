import { useState } from 'react'
import { mockMood } from '../../services/api'
import './ManagementPage.css'

function MoodPage() {
    const [mood, setMood] = useState(mockMood)
    const [formData, setFormData] = useState({
        videoId: mockMood.videoId,
        statusText: mockMood.statusText
    })
    const [saved, setSaved] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setMood(formData)
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
    }

    // Extract video ID from full YouTube URL if pasted
    const handleVideoIdChange = (e) => {
        let value = e.target.value

        // Try to extract video ID from YouTube URL
        const urlMatch = value.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
        if (urlMatch) {
            value = urlMatch[1]
        }

        setFormData({ ...formData, videoId: value })
    }

    return (
        <div className="management-page">
            <header className="admin-header">
                <h1 className="admin-title">
                    <span>🎵</span>
                    Current Mood
                </h1>
            </header>

            <div className="mood-preview">
                <h3>Preview</h3>
                <div className="preview-video">
                    <iframe
                        src={`https://www.youtube.com/embed/${formData.videoId}`}
                        title="Current Mood Preview"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
                {formData.statusText && (
                    <p className="preview-status">"{formData.statusText}"</p>
                )}
            </div>

            <div className="form-card card">
                <h3>Update Mood</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">YouTube Video ID or URL</label>
                        <input
                            type="text"
                            className="form-input"
                            value={formData.videoId}
                            onChange={handleVideoIdChange}
                            placeholder="e.g. jfKfPfyJRdk or YouTube URL"
                            required
                        />
                        <small className="form-hint">
                            Paste a YouTube video ID (11 characters) or full URL
                        </small>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Status Text</label>
                        <input
                            type="text"
                            className="form-input"
                            value={formData.statusText}
                            onChange={(e) => setFormData({ ...formData, statusText: e.target.value })}
                            placeholder="How are you feeling?"
                            maxLength={100}
                        />
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="btn btn-primary">
                            💾 Save Changes
                        </button>
                        {saved && (
                            <span className="save-success">✅ Saved successfully!</span>
                        )}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default MoodPage
