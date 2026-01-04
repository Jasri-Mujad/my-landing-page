import FeedCard from './FeedCard'
import './FeedList.css'

function FeedList({ feeds }) {
    return (
        <section id="feeds" className="feed-list section">
            <div className="container">
                <h2 className="section-title">
                    <span className="section-icon">📰</span>
                    Latest Updates
                </h2>

                {feeds.length === 0 ? (
                    <p className="empty-state">No updates yet. Check back soon!</p>
                ) : (
                    <div className="grid grid-2">
                        {feeds.map((feed) => (
                            <FeedCard key={feed.id} feed={feed} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}

export default FeedList
