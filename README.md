# CareerQuest – Job Portal App

CareerQuest is a full-featured job portal web application that connects job seekers with employers. It allows companies to post job listings and manage applications, while job seekers can browse opportunities and apply with ease.

---

## 🚀 Features

### 👩‍💼 For Job Seekers:
- View all available job listings
- Filter/search jobs by role and location
- Apply to jobs and track application status

### 🏢 For Recruiters:
- Create an account and log in
- Post new jobs
- Manage existing job postings
- View and manage applicants

---

## ⚙️ Installation & Running Locally

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)  
- [MongoDB](https://www.mongodb.com/) (running locally or cloud instance)

### Steps

1. Clone the repository  
   ```bash
   git clone https://github.com/yourusername/careerquest.git
   cd careerquest
   
2. Install backend dependencies                                                                                                                                      
   ```bash
   cd backend
   npm install
   
3. Install frontend dependencies
   ```bashcd
   ../frontend
    npm install

4. Set up environment variables (see below)

5. Start backend server
   ```bash
   cd ../backend
   npm run dev

6. Start frontend server
   ```bash
   cd ../frontend
   npm start

---  

## 🔧 Environment Variables

Create a .env file in the backend folder with the following variables:

```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Create a .env file in the frontend folder if needed (for example, to store API URLs):
  ```bash
  REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🛠 Tech Stack

### Frontend:
- React.js
- Tailwind CSS
- Vite

### Backend:
- Node.js
- Express.js
- MongoDB
- Clerk (Authentication)

### Other Tools:
- Cloudinary (File Upload)
- Sentry (Monitoring)
- Git & GitHub

---

## 📂 Folder Structure

  ```bash
  CareerQuest/
  │
  ├── client/                # Frontend source code
  │   ├── src/
  │   ├── public/
  │   └── vite.config.js
  │
  ├── server/                # Backend (Node.js + Express API)
  │
  ├── .gitignore
  ├── README.md
  └── package.json
```

# JobPortal
 






