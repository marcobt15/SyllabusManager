import React, { useState } from "react";
import axios from "axios";

const PdfUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [extractedText, setExtractedText] = useState("");

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
            setExtractedText(response.data);
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
      <textarea
        style={{ width: "300px", height: "150px" }}
        value={extractedText}
        placeholder="Your PDF text will appear here..."
        readOnly
      />
    </div>
  );
};

export default PdfUploader;
