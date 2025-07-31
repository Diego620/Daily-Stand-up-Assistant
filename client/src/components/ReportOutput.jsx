import React from 'react';
import './ReportOutput.css';
import {jsPDF} from 'jspdf';

function downloadPDF(report){
    const doc = new jsPDF();
    doc.text(report, 10, 10);
    doc.save('daily-standup-report.pdf');
}

const ReportOutput = ({report}) => {
    return(
        <div className="report-output">
            <h2>Generated report</h2>
            <div className="output-box">
                 {report ? <pre>{report}</pre> : <p className="placeholder">No report generated yet</p>}
            </div>

             {report && (
        <button className="generate-button" onClick={downloadPDF}>
          Download as PDF
        </button>
             )}
        </div>
    );
};
   
   

export default ReportOutput;
