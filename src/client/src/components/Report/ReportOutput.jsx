import React, { useState, useEffect } from 'react';
import './ReportOutput.css';
import { jsPDF } from 'jspdf';
// --- 1. Import ReactMarkdown ---
import ReactMarkdown from 'react-markdown';
import { FaDownload, FaEdit, FaShareAlt, FaRegCopy } from 'react-icons/fa';

function downloadPDF(report) {
    const doc = new jsPDF({
        orientation: 'p', // portrait
        unit: 'mm', // millimeters
        format: 'a4' // A4 format
    });

    const margin = 15; // Top, right, bottom, left margin
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const usableWidth = pageWidth - (margin * 2);

    // The key is to pass the text and options object with maxWidth
    doc.text(report, margin, margin, {
        maxWidth: usableWidth
    });

    doc.save('daily-standup-report.pdf');
}

const ReportOutput = ({ report, selectedTemplate }) => {
    const [editableReport, setEditableReport] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [copySuccess, setCopySuccess] = useState(false);

    useEffect(() => {
        setEditableReport(report);
        setIsEditing(false);
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
            <div className="report-header">
                <h2>Generated Report</h2>
                {report && <span className="report-tag">{selectedTemplate}</span>}
            </div>

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
                    // --- 2. This is the key change ---
                    // Replace the <pre> tag with the ReactMarkdown component
                    // This will render the markdown correctly and fix the overflow.
                    <div className="output-box markdown-content">
                        <ReactMarkdown>{editableReport}</ReactMarkdown>
                    </div>
                )
            )}

            {report && (
                <div className="icon-buttons">
                    {isEditing ? (
                        <>
                            <button className="save-btn" onClick={() => setIsEditing(false)}>
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