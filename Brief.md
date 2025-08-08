# Project Brief: Daily Stand-up Assistant

---

### **Last Updated:** August 8, 2025

## 1. 🚀 Project Overview

-   **Project Name:** Daily Stand-up Assistant
-   **One-Liner:** An AI-powered web application to help developers generate daily stand-up reports from raw notes.
-   **Problem Statement:** Developers often write stand-up notes in inconsistent formats. This tool aims to standardize the process and save time by using AI to create well-structured reports.

## 2. 🎯 Goals & Objectives

-   [ ] Create a simple, intuitive user interface for inputting notes.
-   [ ] Integrate with the OpenAI API to handle the report generation logic.
-   [ ] Provide at least one standard report template for the user to choose.
-   [ ] Ensure a clear separation between the React frontend and the C# backend.
-   [ ] Handle API errors gracefully and provide useful feedback to the user.

## 3. 👥 Target Audience

-   Software developers, project managers, and team leads who participate in daily stand-up meetings.

## 4. ✨ Core Features & Functionality

-   **User Input:** A simple text area for users to paste or type their daily notes.
-   **Template Selection:** A dropdown menu to select the report format (e.g., "Standard Standup").
-   **AI Generation:** A "Generate" button that sends the notes and template choice to the backend.
-   **Backend Processing:** The C# API receives the request, constructs a prompt for the OpenAI API, and sends it for processing.
-   **Display Output:** The generated report is returned to the React frontend and displayed clearly to the user.

## 5. 💻 Technical Stack

-   **Frontend:** React, JavaScript (ES6+), Fetch API, CSS.
-   **Backend:** C#, .NET, ASP.NET Core Web API.
-   **Services:** OpenAI API.

## 6. ⚙️ High-Level Architecture

The application follows a standard client-server model.

1.  The user interacts with the **React Frontend** running on `http://localhost:3000`.
2.  When the "Generate" button is clicked, the frontend sends a `POST` request with the user's notes to the **C# Backend API** at `http://localhost:5183/api/Report`.
3.  The C# Backend receives the request, validates it, and then makes a secure API call to the **OpenAI API**.
4.  The OpenAI API processes the prompt and returns the generated text.
5.  The C# Backend sends this generated text back to the React Frontend as a JSON response.
6.  The React Frontend displays the final report to the user.

### Visual Flow:

[User] <--> [React Frontend] <--> [C# Backend] <--> [OpenAI API]