# Blood Connect - Blood Donation App

A cross-platform mobile app that connects blood donors and recipients. Built using React Native, Firebase, Supabase, Cloudinary, and Express.js.

---

## Features

- **User Authentication** using Supabase Auth
- **Profile Setup** with multi-step form and **Profile Picture** with Cloudinary
- **Donor and Recipient Registeration** using Firebase Firestore
- **Donor Search** using Google Maps API 
- **Donor Report** to maintain reliable userbase
- **Real-time Chat** using Firebase Firestore
- **Donation Scheduling and Confirmation** to validate donations
- **User donation history tracking** to track user donations
- **Backend API** with Express.js
- Clean and responsive UI in React Native

---

## 🧱 Tech Stack

| Layer         | Tech Used                       |
|---------------|---------------------------------|
| Frontend      | React Native                    |
| Authentication| Supabase Auth                   |
| Database      | Firebase Firestore              |
| Map           | Google Maps API                 |
| Image Storage | Cloudinary                      |
| Backend       | Express.js (Node.js)            |

---


## Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/blood-donation-app.git
cd blood-donation-app
```

### 2. Install dependencies

```bash
cd frontend
npm install
cd ../backend
npm install
```
### 3. Set up API keys required

.env (Backend)
```bash
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
FIREBASE_API_KEY=your_firebase_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```
.env (Frontend)
```bash
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
CLOUDINARY_UPLOAD_PRESET=your_preset
CLOUDINARY_URL=https://api.cloudinary.com/v1_1/your_cloud_name/image/upload
```
# Screenshots