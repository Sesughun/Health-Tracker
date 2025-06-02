CU Health Tracker
A front-end web application built with Next.js for Covenant University (CU) students to track health metrics, meals, and reminders for diabetes and ulcers management.
Features

Login/Registration: Email/password login with CU-specific email validation (@cu.edu.ng).
Profile Setup: Enter age, gender (with emoji: 🧑 for male, 👩 for female, 🧑‍🦰 for other), height, weight, and select diabetes or ulcers (other conditions disabled).
Dashboard: Overview of health status, recent meals, and alerts.
Meal Tracker: Log meals, view Nigerian meal recommendations with images, and see meal history.
Health Metrics: Log blood sugar (diabetes) or pain level (ulcers) with a trend chart using Chart.js.
Reminders: Set and manage custom reminders for health tasks.
UI: Purple-themed, responsive design with Nigerian cultural elements (Ankara pattern).

Folder Structure
cu-health-tracker/
├── app/
│   ├── globals.css              # Global CSS with Tailwind and custom styles
│   ├── page.tsx                 # Main app entry point
│   ├── layout.tsx               # Root layout
├── components/                   # Reusable React components
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── ProfileSetup.tsx
│ nepr│   ├── Dashboard.tsx
│   ├── Sidebar.tsx
│   ├── MealTracker.tsx
│   ├── MetricsTracker.tsx
│   ├── Reminders.tsx
│   ├── Profile.tsx
├── data/
│   ├── meals.js                 # Static data for recommended meals with image URLs
├── public/
│   ├── images/
│   │   ├── meals/               # Meal images (e.g., egusi-soup.jpg)
│   │   ├── cu-logo.png          # CU logo
│   ├── favicon.ico
├── utils/
│   ├── storage.js               # localStorage utilities
│   ├── uuid.js                  # UUID generator
├── package.json
├── tailwind.config.js
├── README.md

Setup Instructions

Clone the repository:git clone https://github.com/your-username/cu-health-tracker.git
cd cu-health-tracker


Install dependencies:npm install


Add images:
Place meal images in public/images/meals/ (e.g., egusi-soup.jpg).
Add cu-logo.png to public/images/.


Run the development server:npm run dev


Open the app:
Visit http://localhost:3000.
Use student@cu.edu.ng and password123 for demo login.



Demo Flow

Login: Use demo credentials or register with a @cu.edu.ng email.
Profile Setup: Enter details and select diabetes or ulcers.
Dashboard: View health summary and recent alerts.
Meal Tracker: Log a meal, view recommendations with images, and check history.
Health Metrics: Log blood sugar or pain level, view a trend chart, and see history.
Reminders: Add and manage reminders.
Profile: View profile with emoji and edit details.

Dependencies

Next.js: React framework for SPA.
Tailwind CSS: Styling with custom purple theme.
Chart.js & react-chartjs-2: Health metrics visualization.

Notes

Data is stored in localStorage for persistence.
The app is offline-capable (except for CDN-loaded libraries).
Replace placeholder image URLs in data/meals.js with actual image paths.
For demo purposes, login uses hardcoded credentials (student@cu.edu.ng, password123).

