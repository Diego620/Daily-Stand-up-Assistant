import React from "react";
import "./ReportForm.css";

const ReportForm = ({ notes, setNotes, handleGenerate }) => {
    return (
        <div className="report-form">
            <label className="form-label">Your Daily Notes</label>
            <textarea
                className="notes-area"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={`Write your messy notes here...\nExamples:\n- yesterday finished login\n- today working on UI\n- stuck on API`} />

            <button className="generate-button" onClick={handleGenerate}>Generate Report</button>
            
          <div className="how-it-works">
        <h3>How it works</h3>
        <ul>
          <li>Write your raw, unstructured notes in the box above.</li>
          <li>Click "Generate Report" to clean it up automatically.</li>
          <li>The formatted standup report will appear on the right.</li>
          <li>You can download it as a PDF too!</li>
        </ul>
      </div>
        </div>

    );
};

export default ReportForm;