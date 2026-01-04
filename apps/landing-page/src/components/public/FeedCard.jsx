import './FeedCard.css'

function FeedCard({ feed }) {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    return (
        <article className="feed-card card">
            <div className="feed-header">
                <span className="feed-date">{formatDate(feed.createdAt)}</span>
            </div>
            <h3 className="feed-title">{feed.title}</h3>
            <p className="feed-content">{feed.content}</p>
        </article>
    )
}

export default FeedCard
