import React, { useState } from "react";
import axios from "axios";
import eventEmitter from "../eventEmitter";

const PdfUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    console.log(e.target)
    setSelectedFile(e.target.files[0]);
  };
  
  
  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a PDF file first.");
      return;
    }

    const formData = new FormData();
    formData.append("pdfFile", selectedFile);

    try {
        const response = await axios.post("http://localhost:5000/api/extract-text", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        if (response.status === 200) {
          // emit an event to be caught by output
            console.log("Data is good, sending event to be handled by output")
            eventEmitter.emit('textExtracted', response.data)
        } else {
            alert("Failed to extract text from the PDF.");
        }
    } catch (error) {
      console.error("Error uploading the file:", error);
    }
  };

  return (
    <div>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button type="button" onClick={handleUpload}>Upload</button>
      <br />
      <br />
    </div>
    
  );
};

export default PdfUploader;
