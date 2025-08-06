import React, { useState, useEffect } from 'react';
import './ReportOutput.css';
import { jsPDF } from 'jspdf';
import { FaDownload, FaEdit, FaShareAlt, FaRegCopy } from 'react-icons/fa';

function downloadPDF(report) {
    const doc = new jsPDF();
    doc.text(report, 10, 10);
    doc.save('daily-standup-report.pdf');
}

// 1. Receive selectedTemplate from props
const ReportOutput = ({ report, selectedTemplate }) => {
    const [editableReport, setEditableReport] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [copySuccess, setCopySuccess] = useState(false);

    useEffect(() => {
        setEditableReport(report);
        setIsEditing(false); // Exit editing mode when a new report is generated
    }, [report]);

    const handleEmailShare = () => {
        const subject = encodeURIComponent("Daily Standup Report");
        const body = encodeURIComponent(editableReport);
        const mailtoLink = `mailto:?subject=${subject}&body=${body}`;
        window.open(mailtoLink, '_blank');
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(editableReport);
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    return (
        <div className="report-output">
            {/* 2. Header now contains title and the conditionally rendered tag */}
            <div className="report-header">
                <h2>Generated Report</h2>
                {report && <span className="report-tag">{selectedTemplate}</span>}
            </div>

            {/* Display placeholder only if there's no report */}
            {!report ? (
                <div className="output-box placeholder-container">
                    <p className="placeholder">No report generated yet</p>
                </div>
            ) : (
                isEditing ? (
                    <textarea
                        className="output-textarea"
                        value={editableReport}
                        onChange={(e) => setEditableReport(e.target.value)}
                    />
                ) : (
                    <div className="output-box">
                        <pre>{editableReport}</pre>
                    </div>
                )
            )}

            {/* Show icons and buttons only if there is a report */}
            {report && (
                <div className="icon-buttons">
                    {isEditing ? (
                        <>
                            <button
                                className="save-btn"
                                onClick={() => setIsEditing(false)}
                            >
                                Save Changes
                            </button>
                            <button
                                className="cancel-btn"
                                onClick={() => {
                                    setEditableReport(report);
                                    setIsEditing(false);
                                }}
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <>
                            <button className="icon-btn" onClick={() => downloadPDF(editableReport)} title="Download"><FaDownload /></button>
                            <button className="icon-btn" onClick={() => setIsEditing(true)} title="Edit"><FaEdit /></button>
                            <button className="icon-btn" onClick={handleEmailShare} title="Share via Email"><FaShareAlt /></button>
                            <button className="icon-btn" onClick={handleCopy} title="Copy to Clipboard"><FaRegCopy /></button>
                            {copySuccess && <span className="copy-confirm">Copied!</span>}
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default ReportOutput;