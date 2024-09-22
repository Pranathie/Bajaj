import React, { useState } from "react";
import "./index.css"; // Import the CSS file

function JsonInput({ onSubmit }) {
  const [inputValue, setInputValue] = useState("");
  const [fileValue, setFileValue] = useState("");
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleFileChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result.split(",")[1]; // Remove prefix data URL part
      setFileValue(base64String);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const parsedData = JSON.parse(inputValue);
      if (!parsedData.data || !Array.isArray(parsedData.data)) {
        throw new Error("Invalid JSON structure");
      }
      setError(null);
      // console.log(inputValue);
      onSubmit({ data: parsedData.data, file_b64: fileValue });
    } catch (err) {
      setError("Invalid JSON format");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="json-input-form">
        <textarea
          value={inputValue}
          onChange={handleChange}
          className="json-input-textarea"
          placeholder="Enter JSON data..."
          autoFocus
        />
        <br />
        <input
          type="file"
          onChange={handleFileChange}
          className="json-input-file"
        />
        <br />
        <button type="submit" className="json-input-button">
          Submit
        </button>
      </form>
      {error && <p className="json-input-error">{error}</p>}
    </div>
  );
}

export default JsonInput;
