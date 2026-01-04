import { useState, useEffect } from 'react'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import ProjectList from '../components/public/ProjectList'
import { mockProjects } from '../services/api'
import './ProjectsPage.css'

function ProjectsPage() {
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchProjects() {
            try {
                // For MVP, using mock data directly
                setProjects(mockProjects)
            } catch (error) {
                console.error('Failed to fetch projects:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchProjects()
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
            <main className="main-content projects-page">
                <ProjectList projects={projects} />
            </main>
            <Footer />
        </div>
    )
}

export default ProjectsPage
