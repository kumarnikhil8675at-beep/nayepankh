# Smart Learners - Course Marketplace & Community

This is a complete MERN stack application built for the Web-Based Course Marketplace project.

## Directory Structure
- `backend/`: Node.js, Express, MongoDB API
- `frontend/`: React + Vite SPA with Premium Vanilla CSS

## Features Included
1. **JWT Authentication**: Full Registration/Login flow distinguishing between `student` and `creator` roles.
2. **Course Marketplace**: Creators can post new courses; students can view and enroll.
3. **Simulated Payments**: Enrollment bypasses real Stripe/PayPal flows via a seamless one-click purchase button.
4. **Embedded Video Lessons**: Safe iframe integration for YouTube tutorials.
5. **Role-Based Dashboard**: 
   - Students see a visual grid of purchased courses.
   - Creators see high-level metrics (Sales, Students, Total Courses) and a creator suite.
6. **Community Forum**: Real-time nested comments and threads to foster discussion.
7. **Premium Modern UI**: Built with 0 external UI libraries. Pure CSS utilizing CSS variables, light/dark mode toggling, glassmorphism, and responsive grids.

---

## Instructions to Run Local Development

You will need **Node.js** installed on your machine.

### 1. Database Setup
The backend currently points to a local MongoDB instance in `backend/.env`.
Make sure you have MongoDB running locally at `mongodb://127.0.0.1:27017` or replace `MONGODB_URI` in `backend/.env` with your MongoDB Atlas cluster URI.

### 2. Start the Backend
Open a terminal and navigate to the `backend` directory:
```bash
cd backend
npm install
npm run dev
```
*The server will start on http://localhost:5000*

### 3. Start the Frontend
Open a new terminal and navigate to the `frontend` directory:
```bash
cd frontend
npm install
npm run dev
```
*Vite will start the dev server typically on http://localhost:5173*. Open that URL in your browser.

## Testing Guidelines
1. **Create an account** and select "Teacher (Creator)".
2. Navigate to Dashboard -> **Create New Course**. Add a YouTube link (e.g., `https://www.youtube.com/watch?v=dQw4w9WgXcQ`).
3. Open an Incognito Window, **Register** as a "Student".
4. Enroll in the featured course on the Home page.
5. Observe the simulated enrollment success and watch the embedded video through Dashboard.
6. Navigate to **Community** to test the forum interactions.
