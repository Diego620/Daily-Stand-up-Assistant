# Daily Stand-up Assistant

A full-stack web application designed to help users generate structured and coherent daily stand-up reports using the power of AI. The user provides their notes and selects a report template, and the application leverages the OpenAI API to generate a polished report.

## 🚀 Core Features

-   **AI-Powered Report Generation**: Uses the OpenAI API to transform raw notes into a professional stand-up report.
-   **Template Selection**: Allows users to choose from different report formats (e.g., 'Standard Standup').
-   **Clean User Interface**: A simple and intuitive UI built with React for entering notes and viewing the generated output.
-   **Robust Backend**: A C# ASP.NET Core Web API handles the business logic and communication with the OpenAI service.
-   **Separation of Concerns**: A clear distinction between the frontend client and the backend server.

## 💻 Tech Stack

This project is built with a modern full-stack architecture:

### Frontend
-   **React**: A JavaScript library for building user interfaces.
-   **JavaScript (ES6+)**: Including `async/await` for handling API calls.
-   **Fetch API**: For communication with the backend.
-   **CSS**: For custom styling.

### Backend
-   **C#**: The programming language for the server.
-   **.NET**: The framework for building the Web API.
-   **ASP.NET Core**: Specifically used for creating the RESTful API endpoints.
-   **OpenAI API**: The AI service used for report generation.
-   **Swagger**: For API documentation and testing.

## ⚙️ Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You will need the following software installed on your machine:
-   [Node.js](https://nodejs.org/en/) (which includes npm)
-   [.NET SDK](https://dotnet.microsoft.com/download) (Version 6.0 or later recommended)
-   An **OpenAI API Key**. You can get one from the [OpenAI Platform](https://platform.openai.com/).

### Installation & Setup

#### 1. Backend Server (`server`)

The backend needs your OpenAI API key to function.

1.  Navigate to the `server` directory:
    ```bash
    cd server
    ```
2.  In the main `server` directory, create a new file named `appsettings.Development.json`. This file will securely store your API key for local development.
3.  Add your OpenAI API key to `appsettings.Development.json`:
    ```json
    {
      "OpenAI": {
        "ApiKey": "YOUR_OPENAI_API_KEY_HERE"
      }
    }
    ```
4.  Restore the .NET packages and run the server:
    ```bash
    dotnet restore
    dotnet run
    ```
5.  The backend server will now be running, typically on `http://localhost:5183`.

#### 2. Frontend Client (`src` folder)

1.  In a **new terminal**, navigate to the project's root directory (where the `src`, `public`, and `package.json` folders are).
2.  Install the required npm packages:
    ```bash
    npm install
    ```
3.  Start the React development server:
    ```bash
    npm start
    ```
4.  The React application will now be running on `http://localhost:3000`.

### Usage

1.  Open your web browser and go to `http://localhost:3000`.
2.  Enter your work notes for the day into the text area.
3.  Select a report template from the dropdown menu.
4.  Click the **"Generate"** button.
5.  The generated stand-up report will appear in the output section below.

## 🔌 API Endpoints

The backend exposes a RESTful API for the frontend to consume.

### Generate Report
-   **Endpoint**: `POST /api/Report`
-   **Description**: Takes user notes and a template name, and returns an AI-generated report.
-   **Request Body**:
    ```json
    {
      "notes": "string",
      "selectedTemplate": "string"
    }
    ```
-   **Response**:
    ```json
    {
      "report": "The generated report text..."
    }
    ```
You can view and test all available endpoints using the built-in Swagger UI by navigating to `/swagger` on the backend URL (e.g., `http://localhost:5183/swagger`).

