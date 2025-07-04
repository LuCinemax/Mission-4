# Turners Car Insurance Recommendation App

This project is a full-stack application that uses generative AI to guide users through selecting the most appropriate car insurance policy based on their vehicle. Users interact with an AI consultant named Tina, who follows strict rules and asks questions one at a time to determine whether the user qualifies for Mechanical Breakdown Insurance (MBI), Comprehensive Insurance, or Third Party Insurance.

The frontend is built with React (Vite), and the backend is powered by Node.js and Express. Google’s Gemini 1.5 Flash model is used for the AI logic. The application is containerized using Docker and deployed using Kubernetes with Ingress routing.

Tina is governed by a system prompt and enforced rules. She must ask for permission before any personal questions, cannot ask the user which plan they want, and must recommend one based only on the vehicle data. MBI is excluded for trucks or racing cars, Comprehensive is allowed only if the vehicle is under 10 years old, and Third Party is always valid. At the end of the process, Tina instructs the user to click a link to Turners and sign up for the recommended policy.

## .env Configuration (in /Backend)

```
Gemini_KEY=your_api_key_here
PORT=3001
```

## How to Build and Run with Docker

```
docker build -t insurance-app .
docker run -p 3001:3001 insurance-app
```