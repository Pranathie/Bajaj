import React, { useState } from "react";
import axios from "axios";
import JsonInput from "./JsonInput";
import Dropdown from "./Dropdown";
import "./index.css"; // Import the CSS file

function App() {
  const [jsonData, setJsonData] = useState("");
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleJsonSubmit = async (data) => {
    try {
      console.log(data);
      const res = await axios.post(
        "https://bajaj-delta-nine.vercel.app/bfhl",
        data
      );
      console.log(res?.data);
      setResponse(res?.data);
    } catch (error) {
      console.error("Error submitting JSON:", error);
    }
  };

  const handleOptionChange = (selected) => {
    setSelectedOptions(selected);
  };

  const renderResponse = () => {
    if (!response) return null;

    const {
      alphabets,
      numbers,
      highest_lowercase_alphabet,
      file_valid,
      file_mime_type,
      file_size_kb,
    } = response;

    return (
      <div>
        {selectedOptions.includes("Alphabets") && (
          <div className="response-section">
            <h3 className="response-title">Alphabets :</h3>
            <p className="response-data">{alphabets.join(", ")}</p>
          </div>
        )}
        {selectedOptions.includes("Numbers") && (
          <div className="response-section">
            <h3 className="response-title">Numbers :</h3>
            <p className="response-data">{numbers.join(", ")}</p>
          </div>
        )}
        {selectedOptions.includes("Highest Lowercase Alphabet") && (
          <div className="response-section">
            <h3 className="response-title">Highest Lowercase Alphabet :</h3>
            <p className="response-data">
              {highest_lowercase_alphabet.join(", ")}
            </p>
          </div>
        )}
        {selectedOptions.includes("File Info") && (
          <div className="response-section">
            <h3 className="response-title">File Info :</h3>
            <p className="response-data">Valid: {file_valid ? "Yes" : "No"}</p>
            <p className="response-data">MIME Type: {file_mime_type}</p>
            <p className="response-data">Size: {file_size_kb} KB</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="app-container">
      <JsonInput onSubmit={handleJsonSubmit} />
      {response && <Dropdown onChange={handleOptionChange} />}
      {renderResponse()}
    </div>
  );
}

export default App;
