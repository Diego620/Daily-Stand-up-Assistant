import React, { useState } from 'react';
import ReportForm from './components/ReportForm';
import ReportOutput from './components/ReportOutput';
import './App.css';
import { FaRegClock, FaFileAlt, FaRobot } from 'react-icons/fa';

function App() {
    const [notes, setNotes] = useState('');
    const [report, setReport] = useState('');
    const [selectedTemplate, setSelectedTemplate] = useState('Detailed Report');
    // --- 1. Add isLoading state ---
    const [isLoading, setIsLoading] = useState(false);

    function handleGenerate() {
        if (!notes.trim()) {
            setReport("");
            return;
        }

        // --- 2. Set loading to true when generation starts ---
        setIsLoading(true);
        setReport(''); // Clear previous report immediately

        // --- 3. Simulate network/AI processing delay ---
        setTimeout(() => {
            // This is where you would typically handle the API response
            const generatedReport = `Daily Standup Report - ${new Date().toLocaleDateString()}

Summary

Yesterday I focused on general tasks, and today I'm planning to work on 1 items.

Yesterday's Accomplishments
- ${notes}

Today's Plan
- Continue working on the user dashboard.

Blockers
- No blockers today.`;

            setReport(generatedReport); // Set the new report
            setIsLoading(false); // Set loading back to false
        }, 2000); // 2-second delay for demonstration
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
                    // --- 4. Pass isLoading state to the form ---
                    isLoading={isLoading}
                />
                <ReportOutput report={report} selectedTemplate={selectedTemplate} />
            </div>
        </div>
    );
}

export default App;