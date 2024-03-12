// PdfDisplay.jsx

import React from "react";

const PdfDisplay = ({ title, pdfUrl }) => {
    const handleDownload = () => {
        // Add logic here for downloading the PDF
        console.log("Downloading PDF...");
    };

    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md shadow-orange-500">
            <h1 className="mt-2 py-2 text-4xl font-semibold text-gray-900">{title}</h1>
            <div className="flex-col items-center justify-center text-center mt-8">
                <a href={pdfUrl} download>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Download PDF
                    </button>
                </a>
            </div>
        </div>
    );
};

export default PdfDisplay;
