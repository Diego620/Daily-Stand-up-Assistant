import { useState, useEffect } from 'react';
import './App.css';
import { HiSparkles } from 'react-icons/hi';

function App() {
    return (
        <div>
            <div id="header">
                <h1>
                    <HiSparkles style={{ color: "#6C63FF", marginRight: "8px" }} />
                    Daily Standup Assistant
                </h1>
            </div>
        </div>
    );
}

export default App;
