# Full-Stack Blog Frontend (Vue.js + Pinia)

A modern, responsive, and fully decoupled frontend for a blogging platform. Built with **Vue 3 (Composition API)**, managed by **Pinia**, and styled with **Tailwind CSS** and **DaisyUI**.

🔗 **Backend API Repository:** (https://github.com/ola9292/fullstack-blog-backend)

---

## Features

- **Reactive State Management:** Centralized Auth and Blog states using **Pinia**.
- **Dynamic Routing:** Handled by **Vue Router** with protected navigation guards.
- **Full CRUD Integration:** Create, read, update, and delete blog posts via API.
- **Interactive UI:** \* Real-time comment updates (Optimistic UI).
  - Like/Unlike toggles with SVG state changes.
  - Custom scrollable comment sections.
- **Authentication Flow:** Persistent login sessions using `localStorage` and Bearer tokens.
- **Responsive Design:** Fully mobile-friendly layout powered by **Tailwind CSS**.

## Tech Stack

- **Core:** Vue.js 3 (Vite)
- **State:** Pinia
- **Routing:** Vue Router
- **Styling:** Tailwind CSS & DaisyUI
- **HTTP Client:** Axios

---

## Getting Started

### Prerequisites

- Node.js (v18+)
- The Backend API running (see Backend Repo for instructions)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/ola9292/fullstack-blog-frontend.git](https://github.com/ola9292/fullstack-blog-frontend.git)
    cd fullstack-blog-frontend
    ```

## 🔒 Key Logic Highlights

### Decoupled Authentication

The app uses a `useAuthStore` to manage user sessions. Upon login, the Bearer token is stored in `localStorage` and injected into Axios headers for all subsequent authorized requests.

### Optimistic UI Updates

When adding a comment, the frontend waits for a successful API response and then pushes the new comment directly into the local `blog.comments` array, providing an instant update without a full page reload.
