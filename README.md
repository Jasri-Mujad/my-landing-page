# Jasri Space

A personal portfolio and digital playground built with a modern tech stack. Features a dynamic content feed, project showcase, music player integration, and a comprehensive admin dashboard.

![Jasri Space Preview](apps/jasri-space/public/vite.svg)

## 🚀 Tech Stack

- **Frontend:** React (Vite), TypeScript, Tailwind CSS
- **Backend:** Express.js, MongoDB
- **Containerization:** Docker, Docker Compose, NGINX

## 🛠 Features

- **Dynamic Content:** Real-time updates for projects, mood status, and micro-blogging feeds.
- **Admin Dashboard:** Secure interface to manage all content directly.
- **Music Integration:** Embed Spotify playlists and track what's currently "On Rotation".
- **Responsive Design:** Fully responsive UI/UX tailored for both mobile and desktop.
- **Dockerized:** Ready for easy local development and production deployment.

## 🏁 Getting Started

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.
- [Node.js](https://nodejs.org/) (optional, for local non-Docker dev).

### Running with Docker (Recommended)

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Jasri-Mujad/my-landing-page.git
    cd my-landing-page
    ```

2.  **Environment Setup:**
    ```bash
    cp .env.example .env
    ```
    *Update the `.env` file with your specific configurations (e.g., JWT_SECRET).*

3.  **Launch:**
    ```bash
    docker-compose up --build
    ```

4.  **Access:**
    - **Frontend:** [http://localhost:3000](http://localhost:3000)
    - **API:** [http://localhost:5000](http://localhost:5000)

### Manual Setup (Without Docker)

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Run backend:**
    ```bash
    npm run dev -w apps/api
    ```

3.  **Run frontend:**
    ```bash
    npm run dev -w apps/jasri-space
    ```

## 📂 Project Structure

```bash
├── apps
│   ├── api              # Express.js Backend
│   └── jasri-space      # React Frontend
├── docker-compose.yml   # Docker orchestration
└── README.md            # You are here
```

## 🔐 Environment Variables

Reference `.env.example` for all required variables:

- `MONGODB_URI`: Connection string for MongoDB.
- `JWT_SECRET`: Secret key for authentication.
- `VITE_API_URL`: Backend API URL for the frontend.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
