import './App.css';
import { HiSparkles } from 'react-icons/hi';
import { useState } from 'react';

function App() {

    const [text, setText] = useState("Loading...");

    const generateReport = async () => {
        const res = await fetch('http://localhost:5183/api/report', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify("Write a short daily standup report for a developer.")
        });
        const data = await res.json();
        setText(data.text);
    };

    return (
        <div>
            <div id="header">
                <h1>
                    <HiSparkles style={{ color: "#6C63FF", marginRight: "8px" }} />
                    Daily Standup Assistant
                </h1>
            </div>

            <div>
                <h1>Daily Standup Assistant</h1>
                <button onClick={generateReport}>Generate Report</button>
                <p>{text}</p>
            </div>

        </div>
    );
}

export default App;
