export const generateReportApi = async (notes, selectedTemplate) => {
    const API_URL = 'http://localhost:5183/api/Report';

    const response = await fetch(API_URL, {
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
        const errorText = await response.text();
        throw new Error(`Server responded with ${response.status}: ${errorText || 'An unknown error occurred'}`);
    }
    
    return await response.text();
};