import React, { useState } from 'react';
import ReportForm from './components/ReportForm';
import ReportOutput from './components/ReportOutput';
import './App.css';


function App() {
  const [notes, setNotes] = useState('');
  const [report, setReport] = useState('');

  function handleGenerate() {
    setReport(notes);
  }

  return (
   <div className="app-wrapper">
      <div className="app-header">
        <h1>{'\u2728'}Daily Standup Assistant</h1>
        <p>Transform your messy daily notes into professional standup reports. Just write what you did, and we'll format it perfectly.</p>
      </div>

      <div className="app-container">
        <ReportForm
          notes={notes}
          setNotes={setNotes}
          handleGenerate={handleGenerate}
        />
        <ReportOutput report={report} />
      </div>     
    </div>
  )
}

export default App;
