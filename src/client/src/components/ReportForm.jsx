import React from "react";
import "./ReportForm.css";
import { FaMagic, FaUndo } from 'react-icons/fa';

const ReportForm = ({ notes, setNotes, handleGenerate }) => {
    const handleReset = () => {
        setNotes("");
    };

    return (
        <div className="report-form">
            {/* 🔽 Dropdown added here */}
            <div className="dropdown-container">
                <label className="dropdown-label">Report Template</label>
                <select className="template-dropdown">
                    <option>Standard Standup</option>
                    <option>Weekly Journals</option>
                    <option>Minimal Summary</option>
                </select>
            </div>

            <label className="form-label">Your Daily Notes</label>
            <textarea
                className="notes-area"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={`Write your messy notes here...

Examples:
- yesterday finished the login feature, had meeting with design team
- today working on user dashboard, fixing bugs
- stuck on API integration, need help from backend team
- completed code review for John's PR
- planning to start on payment system today`}
            />

            <div className="button-row">
                <button className="generate-button" onClick={handleGenerate}>
                    <FaMagic /> Generate Report
                </button>
                <button className="reset-button" onClick={handleReset}><FaUndo /></button>
            </div>

            <div className="how-it-works">
                <strong>How it works:</strong> Just write your thoughts naturally!
                The AI will automatically categorize your notes into
                yesterday's accomplishments, today's plans, and any blockers you mention.
            </div>
        </div>
    );
};

export default ReportForm;
