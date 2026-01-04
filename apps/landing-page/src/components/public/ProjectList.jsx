import ProjectCard from './ProjectCard'
import './ProjectList.css'

function ProjectList({ projects }) {
    return (
        <section className="project-list section">
            <div className="container">
                <h2 className="section-title">
                    <span className="section-icon">📁</span>
                    My Projects
                </h2>

                {projects.length === 0 ? (
                    <p className="empty-state">No projects yet. Stay tuned!</p>
                ) : (
                    <div className="grid grid-3">
                        {projects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}

export default ProjectList
