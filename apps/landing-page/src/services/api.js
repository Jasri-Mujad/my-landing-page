// Mock data for development
// Replace with actual API calls when backend is ready

export const mockFeeds = [
    {
        id: 1,
        title: "Started learning Kubernetes",
        content: "Today I began my journey into container orchestration with Kubernetes. It's fascinating how it manages containerized applications at scale.",
        createdAt: "2025-01-03"
    },
    {
        id: 2,
        title: "New Project: Cloud Dashboard",
        content: "Excited to announce my new project - a cloud infrastructure dashboard that provides real-time monitoring and alerting.",
        createdAt: "2025-01-02"
    },
    {
        id: 3,
        title: "AWS Solutions Architect Certified!",
        content: "Just passed my AWS Solutions Architect exam! This certification validates my cloud architecture skills.",
        createdAt: "2025-01-01"
    },
    {
        id: 4,
        title: "Exploring Terraform",
        content: "Infrastructure as Code is the way forward. Currently exploring Terraform for multi-cloud deployments.",
        createdAt: "2024-12-28"
    }
]

export const mockProjects = [
    {
        id: 1,
        title: "Cloud Infrastructure Dashboard",
        description: "Real-time monitoring dashboard for AWS/GCP resources with alerting capabilities.",
        repoLink: "https://github.com/example/cloud-dashboard",
        liveLink: "https://dashboard.example.com"
    },
    {
        id: 2,
        title: "Terraform Modules Library",
        description: "Collection of reusable Terraform modules for common cloud infrastructure patterns.",
        repoLink: "https://github.com/example/terraform-modules",
        liveLink: null
    },
    {
        id: 3,
        title: "Kubernetes Deployment Tool",
        description: "CLI tool to simplify Kubernetes deployments with automated health checks.",
        repoLink: "https://github.com/example/k8s-deploy",
        liveLink: null
    }
]

export const mockMood = {
    videoId: "jfKfPfyJRdk",
    statusText: "Coding vibes 🎧 Lo-fi beats to code to"
}

// Simulated API functions
export const api = {
    // Public endpoints
    getFeeds: async () => {
        await delay(300)
        return mockFeeds
    },

    getProjects: async () => {
        await delay(300)
        return mockProjects
    },

    getMood: async () => {
        await delay(200)
        return mockMood
    },

    // Auth
    login: async (username, password) => {
        await delay(500)
        if (username === 'admin' && password === 'admin123') {
            return { success: true, token: 'mock-jwt-token' }
        }
        throw new Error('Invalid credentials')
    },

    logout: async () => {
        await delay(200)
        return { success: true }
    },

    // Admin - Feeds
    createFeed: async (feed) => {
        await delay(400)
        return { id: Date.now(), ...feed, createdAt: new Date().toISOString() }
    },

    updateFeed: async (id, feed) => {
        await delay(400)
        return { id, ...feed }
    },

    deleteFeed: async (id) => {
        await delay(300)
        return { success: true }
    },

    // Admin - Projects
    createProject: async (project) => {
        await delay(400)
        return { id: Date.now(), ...project }
    },

    updateProject: async (id, project) => {
        await delay(400)
        return { id, ...project }
    },

    deleteProject: async (id) => {
        await delay(300)
        return { success: true }
    },

    // Admin - Mood
    updateMood: async (mood) => {
        await delay(400)
        return mood
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
