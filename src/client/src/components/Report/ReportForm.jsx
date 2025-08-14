import React from "react";
import "./ReportForm.css";
import { FaMagic, FaUndo } from 'react-icons/fa';

const ReportForm = ({ notes, setNotes, handleGenerate, selectedTemplate, setSelectedTemplate, isLoading }) => {
    
    // resets the notes 
    const handleReset = () => {
        setNotes("");
    };

    return (
        <div className="report-form">
            <div className="dropdown-container">
                <label className="dropdown-label">Report Template</label>
                <select
                    className="template-dropdown"
                    value={selectedTemplate}
                    onChange={(e) => setSelectedTemplate(e.target.value)}
                    disabled={isLoading} // Disable dropdown while loading
                >
                    <option>Detailed Report</option>
                    <option>Weekly Journals</option>
                    <option>Standard Standup</option>
                    <option>Minimal Summary</option>
                </select>
            </div>
            
            <label className="form-label">Your Daily Notes</label>
            <textarea // Textarea for user input notes
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
                readOnly={isLoading} // Textarea becomes readonly while loading
            />
            
            <div className="button-row">
                <button
                    className="generate-button"
                    onClick={handleGenerate}
                    disabled={isLoading || !notes.trim()} // Disable if loading or no notes
                >
                    {isLoading ? (
                        <>
                            <span className="loader"></span>
                            <span>Generating...</span>
                        </>
                    ) : (
                        <>
                            <FaMagic />
                            <span>Generate Report</span>
                        </>
                    )}
                </button>
                
                <button // Reset button to clear notes
                    className="reset-button"
                    onClick={handleReset}
                    disabled={isLoading} // Also disable reset button
                >
                    <FaUndo />
                </button>
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