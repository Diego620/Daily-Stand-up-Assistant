export const generateReportApi = async (notes, selectedTemplate) => {
    // The backend URL. Using a variable is good practice.
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
        // If the server responds with an error, build an error message and throw it
        const errorText = await response.text();
        throw new Error(`Server responded with ${response.status}: ${errorText || 'An unknown error occurred'}`);
    }

    // If successful, return the report text
    return await response.text();
};