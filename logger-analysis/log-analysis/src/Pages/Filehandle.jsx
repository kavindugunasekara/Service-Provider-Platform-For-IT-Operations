import axios from "axios";
import { AlertTriangle, CheckCircle, FileUpIcon,  Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Filehandle = () => {
  const [files, setFiles] = useState([]);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { email, token } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`http://localhost:5000/getlogfiles?email=${email}`);
        const cleanedFiles = response.data.files.map(file => file.replace(/^\/Static\//, ""));
        setFiles(cleanedFiles);
      } catch (err) {
        setError("Error fetching files.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFiles();
  }, [email]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (selectedFile) => {
    if (!selectedFile) {
      setError("No file selected.");
      return;
    }

    const validExtensions = ["txt", "log"];
    const fileExtension = selectedFile.name.split(".").pop().toLowerCase();
    
    if (!validExtensions.includes(fileExtension)) {
      setError("Invalid file type. Please upload a .txt or .log file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const fileContent = event.target.result;

      if (!validateLogFormat(fileContent)) {
        setError("Invalid log file format. Please ensure it follows the correct structure.");
        setFileName("");
      } else {
        setFileName(selectedFile.name);
        setError("");
        setSuccess("File ready to upload!");
      }
    };

    reader.onerror = () => {
      setError("Error reading the file.");
    };

    reader.readAsText(selectedFile);
  };

  const validateLogFormat = (content) => {
    const logLines = content
      .split("\n")
      .map(line => line.trim().replace(/\r$/, ""))
      .filter(line => line !== "");

    const logRegex = /^(\d{1,3}\.){3}\d{1,3} - (\w+|\-) \[\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z\] "\w+ .*?" \d{3}$/;

    return logLines.every((line) => logRegex.test(line));
  };

  const handleFileDelete = async (fileNameToDelete) => {
    try {
      setIsLoading(true);
      const filePathToDelete = `/Static/${fileNameToDelete}`;
      await axios.delete(`http://localhost:5000/delete/?file=${filePathToDelete}&email=${email}`);
      setFiles((prevFiles) => prevFiles.filter((file) => file !== fileNameToDelete));
      setSuccess("File deleted successfully.");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Error deleting the file.");
      setTimeout(() => setError(""), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!fileName) {
      setError("Please select a valid file before uploading.");
      return;
    }
  
    const file = document.getElementById("file-upload").files[0];
    const formData = new FormData();
    formData.append("logfile", file);
    formData.append("email", email);
  
    try {
      setIsLoading(true);
      setSuccess("");
      setError("");
      await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccess("File uploaded successfully!");
      
      // Refresh file list after successful upload
      const response = await axios.get(`http://localhost:5000/getlogfiles?email=${email}`);
      const cleanedFiles = response.data.files.map(file => file.replace(/^\/Static\//, ""));
      setFiles(cleanedFiles);
      
      // Reset form
      setFileName("");
      document.getElementById("file-upload-form").reset();
      
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error(err);
      setError("Error uploading the file.");
      setTimeout(() => setError(""), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
        <div className="h-1 w-20 bg-blue-600 mt-2 mb-4 rounded"></div>
        <p className="text-gray-600">Manage your log files and application preferences here.</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <FileUpIcon className="mr-2 text-blue-600" size={24} />
          Log File Manager
        </h2>
        
        <form 
          id="file-upload-form"
          onSubmit={handleSubmit} 
          className="mt-6"
          onDragEnter={handleDrag}
        >
          <div 
            className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center transition-colors ${
              dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-400"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept=".txt,.log"
            />
            <label 
              htmlFor="file-upload" 
              className="cursor-pointer mb-4"
            >
              <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FileUpIcon size={32} className="text-blue-600" />
              </div>
              <p className="text-center font-medium text-gray-700">
                Drag and drop your log file here
              </p>
              <p className="text-center text-sm text-gray-500 mt-1">
                or <span className="text-blue-600 hover:underline">browse</span> to select a file
              </p>
              <p className="text-center text-xs text-gray-400 mt-2">
                Supported formats: .txt, .log
              </p>
            </label>
            
            {fileName && (
              <div className="mt-4 p-3 bg-gray-50 rounded-md w-full flex items-center justify-between">
                <div className="flex items-center">
                  <CheckCircle className="text-green-600 mr-2" size={20} />
                  <span className="text-gray-700 font-medium">{fileName}</span>
                </div>
                <button 
                  type="button" 
                  onClick={() => {
                    setFileName("");
                    document.getElementById("file-upload-form").reset();
                  }}
                  className="text-gray-400 hover:text-red-600"
                >
                  <X size={20} />
                </button>
              </div>
            )}
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md flex items-center">
              <AlertTriangle className="mr-2 flex-shrink-0" size={20} />
              <span>{error}</span>
            </div>
          )}
          
          {success && !error && (
            <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-md flex items-center">
              <CheckCircle className="mr-2 flex-shrink-0" size={20} />
              <span>{success}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={!fileName || isLoading}
            className={`mt-6 w-full py-3 px-4 rounded-md text-white font-medium flex items-center justify-center ${
              !fileName || isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isLoading ? "Processing..." : "Upload File"}
          </button>
        </form>

        {files.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Uploaded Files</h3>
            <div className="bg-gray-50 rounded-lg border border-gray-200">
              <ul className="divide-y divide-gray-200">
                {files.map((file, index) => (
                  <li key={index} className="p-4 flex items-center justify-between hover:bg-gray-100">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-blue-100 rounded-md flex items-center justify-center mr-3">
                        <span className="text-blue-600 text-xs font-medium">.{file.split('.').pop()}</span>
                      </div>
                      <span className="text-gray-700 font-medium truncate max-w-xs">{file}</span>
                    </div>
                    <button
                      onClick={() => handleFileDelete(file)}
                      className="p-2 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-50"
                      title="Delete file"
                    >
                      <Trash2 size={18} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filehandle;