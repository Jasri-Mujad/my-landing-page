import './CurrentMood.css'

function CurrentMood({ videoId, statusText }) {
    return (
        <section id="current-mood" className="current-mood section">
            <div className="container">
                <h2 className="section-title">
                    <span className="section-icon">🎵</span>
                    Current Mood
                </h2>

                <div className="mood-content">
                    <div className="video-container">
                        <iframe
                            src={`https://www.youtube.com/embed/${videoId}`}
                            title="Current Mood"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>

                    {statusText && (
                        <p className="mood-status">
                            "{statusText}"
                        </p>
                    )}
                </div>
            </div>
        </section>
    )
}

export default CurrentMood
