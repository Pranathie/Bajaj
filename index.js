const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { Buffer } = require("buffer");

// Initialize app
const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Utility to calculate file size in KB
const getFileSizeInKB = (base64String) => {
  const buffer = Buffer.from(base64String, "base64");
  return (buffer.length / 1024).toFixed(2); // size in KB
};

// POST /bfhl route
app.post("/bfhl", (req, res) => {
  try {
    console.log("Pranathi's Server has started");
    const { data, file_b64 } = req.body;

    // Define static user data
    const user_id = "pranathi_Bolisetty_24062004";
    const email = "pranathi_bolisetty@srmap.edu.in";
    const roll_number = "AP21110011322";
    const numbers = [];
    const alphabets = [];
    let high_alpha = "";

    // Input validation and categorization
    for (let i = 0; i < data.length; i++) {
      if (!isNaN(data[i])) {
        numbers.push(data[i]);
      } else if (/^[a-zA-Z]$/.test(data[i])) {
        // only accept single character alphabets
        alphabets.push(data[i]);
        if (data[i].toLowerCase() > high_alpha.toLowerCase()) {
          high_alpha = data[i];
        }
      }
    }

    const highest_alphabet = high_alpha ? [high_alpha] : [];

    // File handling logic
    let file_valid = false;
    let file_mime_type = "";
    let file_size_kb = 0;

    if (file_b64) {
      try {
        const buffer = Buffer.from(file_b64, "base64");
        file_size_kb = getFileSizeInKB(file_b64);

        // Check for valid MIME type (you can extend this with more MIME types as needed)
        file_mime_type = "application/octet-stream"; // Default binary
        if (buffer.toString("utf8", 0, 4).startsWith("\x89PNG")) {
          file_mime_type = "image/png";
        } else if (buffer.toString("utf8", 0, 4).startsWith("%PDF")) {
          file_mime_type = "application/pdf";
        } else if (buffer.toString("utf8", 0, 4).includes("JFIF")) {
          file_mime_type = "image/jpeg";
        }

        file_valid = true;
      } catch (err) {
        file_valid = false;
      }
    }

    // Build the response
    res.json({
      is_success: true,
      user_id,
      email,
      roll_number,
      numbers,
      alphabets,
      highest_lowercase_alphabet: highest_alphabet,
      file_valid,
      file_mime_type,
      file_size_kb,
    });
  } catch (error) {
    // Error handling
    res.status(500).json({
      is_success: false,
      error: "Internal Server Error",
    });
  }
});

// GET /bfhl route
app.get("/bfhl", (req, res) => {
  try {
    // Hardcoded response for GET method
    res.json({ operation_code: 1 });
  } catch (error) {
    res.status(500).json({ is_success: false, error: "Internal Server Error" });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
