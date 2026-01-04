import './ProjectCard.css'

function ProjectCard({ project }) {
    return (
        <article className="project-card card">
            <h3 className="project-title">{project.title}</h3>
            <p className="project-description">{project.description}</p>

            <div className="project-links">
                {project.repoLink && (
                    <a
                        href={project.repoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary btn-sm"
                    >
                        🔗 Repo
                    </a>
                )}
                {project.liveLink && (
                    <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary btn-sm"
                    >
                        🌐 Live
                    </a>
                )}
            </div>
        </article>
    )
}

export default ProjectCard
