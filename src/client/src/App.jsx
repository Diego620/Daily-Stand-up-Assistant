import React from 'react';
// --- Import the new HomePage component ---
import { HomePage } from './pages/HomePage/HomePage';
// --- Import the global stylesheet from its new location ---
import './styles/App.css';

function App() {
    return (
        <div className="app-wrapper">
            <HomePage />
        </div>
    );
}

export default App;