import './Hero.css'

function Hero() {
    return (
        <section className="hero">
            <div className="container hero-content">
                <div className="hero-badge">👋 Welcome</div>
                <h1 className="hero-title">
                    Hi, I'm <span className="highlight">Developer</span>
                </h1>
                <p className="hero-subtitle">
                    Building digital experiences with passion and precision.
                    Explore my projects and stay tuned for updates.
                </p>
                <div className="hero-actions">
                    <a href="#current-mood" className="btn btn-primary">
                        🎵 Current Mood
                    </a>
                    <a href="#feeds" className="btn btn-secondary">
                        📰 Latest Updates
                    </a>
                </div>
            </div>
            <div className="hero-glow"></div>
        </section>
    )
}

export default Hero
