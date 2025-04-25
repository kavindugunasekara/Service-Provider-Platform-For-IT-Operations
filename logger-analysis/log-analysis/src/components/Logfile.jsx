import axios from "axios";
import { useState } from "react";
import { FaFile } from "react-icons/fa";
import { useSelector } from "react-redux";

function LogFileUpload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { email, token } = useSelector((state) => state.user);


  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) {
      setError("No file selected.");
      return;
    }

    // Check file extension
    const validExtensions = ["txt", "log"];
    const fileExtension = selectedFile.name.split(".").pop().toLowerCase();

    if (!validExtensions.includes(fileExtension)) {
      setError("Invalid file type. Please upload a .txt or .log file.");
      setFile(null);
      return;
    }

    setError(""); // Reset errors
    setFile(selectedFile);

    // Read the file content for format validation
    const reader = new FileReader();
    reader.onload = (event) => {
      const fileContent = event.target.result;
      console.log(fileContent)
      if (!validateLogFormat(fileContent)) {
        alert("Invalid log format!\n\nCorrect format:\n192.168.1.1 - username [2025-03-29T14:30:00Z] \"METHOD /path\" STATUS_CODE");
        setError("Invalid log file format. Ensure it follows the correct structure.");
        setFile(null);
      }
    };
    reader.readAsText(selectedFile);
  };

  const validateLogFormat = (content) => {
    const logLines = content
      .split("\n")
      .map(line => line.trim().replace(/\r$/, "")) // Trim and remove trailing \r
      .filter(line => line !== "");
  
    // More flexible regex to allow minor variations
    const logRegex = /^(\d{1,3}\.){3}\d{1,3} - (\w+|\-) \[\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z\] "\w+ .*?" \d{3}$/;
  
    return logLines.every((line) => logRegex.test(line));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("Please select a valid file before uploading.");
      return;
    }
    

    const formData = new FormData();
    formData.append("logfile", file);
    formData.append("email", email); // Attach email

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const response = await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 201) {
        setSuccess("File uploaded successfully!");
        setFile(null);
      } else {
        setError("Upload failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while uploading the file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-left">
      <div className="flex items-center gap-2 mb-4">
        <FaFile className="text-2xl text-blue-600" />
        <h3 className="text-lg font-medium">Log File Upload</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="file-upload" className="text-sm font-medium text-gray-700">
            Choose Log File
          </label>
          <input
            id="file-upload"
            type="file"
            className="mt-1 p-2 border border-gray-300 rounded-md"
            onChange={handleFileChange}
            accept=".txt,.log"
          />
        </div>

        {error && <div className="text-red-600">{error}</div>}
        {success && <div className="text-green-600">{success}</div>}

        <div className="mt-4">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload Log File"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default LogFileUpload;
