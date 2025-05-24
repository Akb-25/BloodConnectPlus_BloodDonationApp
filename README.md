# Blood Connect - Blood Donation App

A cross-platform mobile app that connects blood donors and recipients. Built using React Native, NodeJS, Express.js Firebase, Supabase and Cloudinary.

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

## Tech Stack

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
git clone [https://github.com/your-username/blood-donation-app.git](https://github.com/Akb-25/BloodConnectPlus_BloodDonationApp)
cd BloodConnectPlus_BloodDonationApp
```

### 2. Install dependencies
```bash
npm install
cd server
npm install
```

### 3. Set up API keys required
.env (Backend)
```bash
REACT_APP_FIREBASE_API_KEY=your_api_key_here
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
REACT_APP_FIREBASE_PROJECT_ID=your_project_id_here
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
REACT_APP_FIREBASE_APP_ID=your_app_id_here
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id_here

SUPABASE_URL = your_url_here
SUPABASE_ANON_KEY = your_supabase_anon_key_here


CLOUDINARY_CLOUD_NAME= enter_your_cloud_name_here
CLOUDINARY_API_KEY= api_key
CLOUDINARY_SECRET= api_secret
```
.env (Frontend)
```bash
REACT_APP_FIREBASE_API_KEY=your_api_key_here
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
REACT_APP_FIREBASE_PROJECT_ID=your_project_id_here
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
REACT_APP_FIREBASE_APP_ID=your_app_id_here
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id_here

SUPABASE_URL = your_url_here
SUPABASE_ANON_KEY = your_supabase_anon_key_here

CLOUDINARY_CLOUD_NAME= enter_your_cloud_name_here
CLOUDINARY_API_KEY= api_key
CLOUDINARY_SECRET= api_secret
```

# Screenshots
<div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: space-between;">
  <img src="https://github.com/user-attachments/assets/143810cd-9769-46ad-8e5a-1e237347db38" style="width: 33%; height: 750px; object-fit: cover;"/>
  <img src="https://github.com/user-attachments/assets/9489e1ef-c062-4266-8441-d85a96546503" style="width: 33%; height: 750px; object-fit: cover;"/>
  <img src="https://github.com/user-attachments/assets/823c5392-c5bd-4cbe-9e36-3cd4714f680b" style="width: 33%; height:  750px; object-fit: cover;"/>
  
  <img src="https://github.com/user-attachments/assets/b4074094-c660-460d-b279-2cc06f683c5d" style="width: 33%; height: 750px; object-fit: cover;"/>
  <img src="https://github.com/user-attachments/assets/40e907a8-1f50-47c7-95b2-c2da7db8242a" style="width: 33%; height: 750px; object-fit: cover;"/>
  <img src="https://github.com/user-attachments/assets/c9519aa7-375f-47ce-9837-8b36a5a93747" style="width: 33%; height: 750px; object-fit: cover;"/>
  
  <img src="https://github.com/user-attachments/assets/93a58474-a4fb-483a-96f0-3964e7e2eca8" style="width: 33%; height: 750px; object-fit: cover;"/>
  <img src="https://github.com/user-attachments/assets/6e221059-c53b-480d-9387-29db4a127ed4" style="width: 33%; height: 750px; object-fit: cover;"/>
  <img src="https://github.com/user-attachments/assets/07bcb55b-3072-454b-bee3-abac63835a2b" style="width: 33%; height: 750px; object-fit: cover;"/>
  
  <img src="https://github.com/user-attachments/assets/679b98ff-4fe4-44c9-9890-f260bfec69a0" style="width: 33%; height: 750px; object-fit: cover;"/>
  <img src="https://github.com/user-attachments/assets/7aa010fb-1fdf-4895-9181-1a0f2f7ee27d" style="width: 33%; height: 750px; object-fit: cover;"/>
  <img src="https://github.com/user-attachments/assets/82fa3eb1-8a60-479c-b88d-9579404e2222" style="width: 33%; height: 750px; object-fit: cover;"/>
</div>
