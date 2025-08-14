import React from 'react';

//importing our components and hooks
import { useReportGenerator } from '../../hooks/useReportGenerator';
import ReportForm from '../../components/Report/ReportForm';
import ReportOutput from '../../components/Report/ReportOutput';

// Homepage design
import './HomePage.css';

// icons needed for the header tags
import { FaRegClock, FaFileAlt } from 'react-icons/fa';
import { FaWandMagicSparkles } from "react-icons/fa6";

// Importing the logo icon from svg file
import LogoIcon from '../../assets/iconLogo.svg';

// 
export function HomePage() {
    const {
        notes,
        setNotes,
        report,
        selectedTemplate,
        setSelectedTemplate,
        isLoading,
        error,
        handleGenerate,
    } = useReportGenerator();
    return (
        <>
            <div className="app-header">
                <h1>
                    <img src={LogoIcon} alt="Logo Icon" className="header-icon" />
                    Daily Standup Assistant
                </h1>
                <p className="subtitle">
                    Transform your messy daily notes into professional standup reports. Just write what
                    you did, and we'll format it perfectly.
                </p>
                <div className="header-tags">
                    <span className="tag">
                        <FaRegClock /> Saves time
                    </span>
                    <span className="tag">
                        <FaFileAlt /> Professional format
                    </span>
                    <span className="tag">
                        <FaWandMagicSparkles /> AI-powered
                    </span>
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
                {error && <div className="error-message">{error}</div>}
                <ReportOutput report={report} selectedTemplate={selectedTemplate} />
            </div>
        </>
    );
}