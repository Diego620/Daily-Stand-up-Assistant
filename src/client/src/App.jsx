import React, { useState } from 'react';
import ReportForm from './components/ReportForm';
import ReportOutput from './components/ReportOutput';
import './App.css';
import { FaRegClock, FaFileAlt, FaRobot } from 'react-icons/fa';

function App() {
    const [notes, setNotes] = useState('');
    const [report, setReport] = useState('');
    const [selectedTemplate, setSelectedTemplate] = useState('Standard Standup');
    const [isLoading, setIsLoading] = useState(false);
    // --- 1. Add an error state ---
    const [error, setError] = useState('');

    // --- 2. Replace the simulated function with a real API call ---
    async function handleGenerate() {
        if (!notes.trim()) {
            setReport("");
            return;
        }

        setIsLoading(true);
        setReport('');
        setError(''); // Clear previous errors

        try {
            const response = await fetch('http://localhost:5183/api/Report', { // <-- IMPORTANT: Check this port!
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    notes: notes,
                    selectedTemplate: selectedTemplate,
                }),
            });

            if (!response.ok) {
                // Handle server errors (e.g., 500 Internal Server Error)
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const generatedReport = await response.text(); // The backend returns a plain string
            setReport(generatedReport);

        } catch (e) {
            console.error("Failed to generate report:", e);
            setError('Failed to generate report. The server might be down or an error occurred.');
            setReport(''); // Clear any partial report
        } finally {
            setIsLoading(false); // Ensure loading is turned off in all cases
        }
    }

    return (
        <div className="app-wrapper">
            <div className="app-header">
                <h1>{'\u2728'} Daily Standup Assistant</h1>
                <p>Transform your messy daily notes into professional standup reports. Just write what you did, and we'll format it perfectly.</p>
                <div className="feature-tags">
                    <span className="feature-tag"><FaRegClock /> Saves time</span>
                    <span className="feature-tag"><FaFileAlt /> Professional format</span>
                    <span className="feature-tag"><FaRobot /> AI-powered</span>
                </div>
            </div>

            <div className="app-container">
                <ReportForm
                    notes={notes}
                    setNotes={setNotes}
                    handleGenerate={handleGenerate}
                    selectedTemplate={selectedTemplate}
                    setSelectedTemplate={setSelectedTemplate}
                    isLoading={isLoading}
                />
                {/* --- 3. Display the error message if it exists --- */}
                {error && <div className="error-message">{error}</div>}
                <ReportOutput report={report} selectedTemplate={selectedTemplate} />
            </div>
        </div>
    );
}

export default App;