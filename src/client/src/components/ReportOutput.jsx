import React from 'react';
import './ReportOutput.css'; // Import styles for this component
import { jsPDF } from 'jspdf'; // Import jsPDF library to generate PDFs

// Function to generate and download the PDF
function downloadPDF(report) {
    const doc = new jsPDF(); // Create a new PDF document
    doc.text(report, 10, 10); // Add the report text at x=10, y=10 in the PDF
    doc.save('daily-standup-report.pdf'); // Trigger download with this file name
}

// React component to display the generated report
const ReportOutput = ({ report }) => {
    return (
        <div className="report-output">
            <h2>Generated report</h2>

            {/* Display the report if it exists, otherwise show a placeholder */}
            <div className="output-box">
                {report ? <pre>{report}</pre> : <p className="placeholder">No report generated yet</p>}
            </div>

            {/* Show the Download button only if a report exists */}
            {report && (
                <button className="generate-button" onClick={() => downloadPDF(report)}>
                    Download as PDF
                </button>
            )}
        </div>
    );
};

export default ReportOutput; // Export component for use in App.jsx or other files
