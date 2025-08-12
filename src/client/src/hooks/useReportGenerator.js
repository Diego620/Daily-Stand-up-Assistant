import { useState } from 'react';
import { generateReportApi } from '../api/reportService';

// A custom hook is just a function that uses other hooks.
// Its name must start with "use".
export const useReportGenerator = () => {
    const [notes, setNotes] = useState('');
    const [report, setReport] = useState('');
    const [selectedTemplate, setSelectedTemplate] = useState('Standard Standup');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGenerate = async () => {
        if (!notes.trim()) {
            setReport("");
            return;
        }

        setIsLoading(true);
        setReport('');
        setError('');

        try {
            const generatedReport = await generateReportApi(notes, selectedTemplate);
            setReport(generatedReport);
        } catch (e) {
            console.error("Failed to generate report:", e);
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    };

    // The hook returns everything the component needs to function.
    return {
        notes,
        setNotes,
        report,
        selectedTemplate,
        setSelectedTemplate,
        isLoading,
        error,
        handleGenerate,
    };
};