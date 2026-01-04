import { useState, useEffect } from 'react'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import Hero from '../components/public/Hero'
import CurrentMood from '../components/public/CurrentMood'
import FeedList from '../components/public/FeedList'
import { api, mockFeeds, mockMood } from '../services/api'
import './HomePage.css'

function HomePage() {
    const [feeds, setFeeds] = useState([])
    const [mood, setMood] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            try {
                // For MVP, using mock data directly
                // Replace with api.getFeeds() and api.getMood() when backend is ready
                setFeeds(mockFeeds.slice(0, 4))
                setMood(mockMood)
            } catch (error) {
                console.error('Failed to fetch data:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    if (loading) {
        return (
            <div className="page-wrapper">
                <Header />
                <main className="main-content">
                    <div className="loading-container">
                        <div className="loading-spinner"></div>
                    </div>
                </main>
                <Footer />
            </div>
        )
    }

    return (
        <div className="page-wrapper">
            <Header />
            <main className="main-content">
                <Hero />
                {mood && (
                    <CurrentMood
                        videoId={mood.videoId}
                        statusText={mood.statusText}
                    />
                )}
                <FeedList feeds={feeds} />
            </main>
            <Footer />
        </div>
    )
}

export default HomePage
