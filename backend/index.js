const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const pdfParse = require('pdf-parse');
const getSyllabusInformation = require('./getSyllabusInformation');

require('dotenv').config({path: '../.env'});

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(fileUpload());

// Route to handle PDF file upload and text extraction
app.post('/api/extract-text', async (req, res) => {
    if (!req.files || !req.files.pdfFile) {
        return res.status(400).send("No file uploaded.");
    }

    try {
        const pdfFile = req.files.pdfFile;
        const result = await pdfParse(pdfFile); // Await on PDF parsing
        const assignments = await getSyllabusInformation(result.text); // Await on external function
        res.status(200).json(assignments); // Send JSON response
    } catch (error) {
        console.error('Error processing PDF:', error);
        res.status(500).send("Error processing PDF.");
    }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

