# Plain-Language Insurance 🛡️

A comprehensive hackathon project aimed at making insurance policies understandable and accessible using AI technology. This application decodes complex legal jargon, analyzes coverage, highlights exclusions, and visualizes insurance data into a user-friendly format.

## 🚀 Features

### **Frontend Features** 
*Built with React, Vite, TailwindCSS, and framer-motion.*
- **Landing Page**: Modern, visually appealing presentation of the product.
- **Dashboard**: Intuitive user dashboard displaying policy overviews and insights.
- **Insurance Policy Analysis**: UI to read uploaded document metrics and visualize coverage.
- **User Account & Setup**: Sign-up flow, profile section, payment gateways, and a trusted center.
- **AI Integration**: Connects with Gemini to provide smart plain-language explanations.

### **Backend Features**
*Built with Node.js, Express, and Multer.*
- **Document Parsing**: Upload and parse PDF and TXT insurance policies.
- **Coverage Analysis**: Breakdown of hospital, dental, maternity, and prescription coverages.
- **Risk Score Analysis**: Intelligent scoring based on age, lifestyle, and claims.
- **Legal Text Simplification**: Summarize and simplify long policy paragraphs using NLP.
- **AI-Enhanced**: Optional HuggingFace integration to boost classification, simplification, and suggestions. No database is required! All state is handled statelessly or flexibly during demo sessions.

---

## 🛠️ Architecture & Tech Stack

**Frontend (Client Directory: `/frontend`)**:
- React 19 + TypeScript
- Vite (fast builds)
- Tailwind CSS v4 for styling
- Google Gemini API (`@google/genai`) for in-browser AI features

**Backend (Server Directory: `/backend`)**:
- Node.js + Express
- `multer` for multipart/form-data (PDF/text file uploads)
- `pdf-parse` for text extraction
- RESTful JSON endpoints

---

## 🏃‍♂️ Getting Started 

### Prerequisites
- [Node.js](https://nodejs.org/en/) installed on your local machine.
- Free [Gemini API Key](https://aistudio.google.com/) for the frontend.
- Optional Free [HuggingFace Access Token](https://huggingface.co/settings/tokens) for backend AI models.

### 1. Running the Backend Server
1. Open your terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set your environment variables:
   Rename `.env.example` to `.env` and add your HuggingFace Token (optional):
   ```plaintext
   HF_API_KEY=your_hugging_face_token_here
   ```
4. Start the server (runs on `http://localhost:3001`):
   ```bash
   npm start
   ```
*(For development with hot-reloading, run `npm run dev`)*

### 2. Running the Frontend Application
1. Open up a second terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install tools:
   ```bash
   npm install
   ```
3. Configure API Keys:
   Rename `.env.example` or create `.env.local` inside the frontend directory, providing your API keys.
   ```plaintext
   VITE_GEMINI_API_KEY=your_gemini_api_key
   ```
4. Start the development server (runs on `http://localhost:3000`):
   ```bash
   npm run dev
   ```

---

## 📡 Key Backend API Endpoints

- `POST /upload-policy` - Upload a `.pdf` or `.txt` policy file.
- `POST /analyze` - Analyze text to fetch coverage items for hospitalization, dental, etc.
- `POST /risk-score` - Calculates a basic risk score given age, smoker status, and claims.
- `POST /simplify` - Ask the API to summarize legal text into plain English.
- `GET /exclusions` - Retrieves exclusions from the latest uploaded file.

*Check `backend/README.md` for test payloads and CURL commands.*

---

## 🌐 Deployment (Free tier)
- **Backend**: Pre-configured to be deployed natively on Render.com as a Node Web Service (install with `npm install` and run `npm start`).
- **Frontend**: Can be built using `npm run build` and published easily to platforms like Vercel, Netlify, or GitHub Pages.

---
*Created for our Hackathon goal to bring transparency and simplicity for the everyday policyholder.*