import axios from "axios";
import { useEffect, useState } from "react";
import { FaArrowDown, FaFile } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useLogData } from "./Logcontext";


function Analysislog() {
  const [files, setFiles] = useState([]); 
  const [displayFiles, setDisplayFiles] = useState([]); 
  const [selectedFile, setSelectedFile] = useState(""); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(""); 

  const { setLogData,setRowCount,setUploadedFileCount } = useLogData(); // Use context to set logData globally

  const { email, token } = useSelector((state) => state.user);



  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.post("http://localhost:5000/logfiles", {
          email,
        });

        if (response.data.success) {
          const fullPaths = response.data.files || [];
          setFiles(fullPaths);
          const cleanedFiles = fullPaths.map((file) => file.replace(/^\/Static\//, ""));
          setDisplayFiles(cleanedFiles);
          setSelectedFile(fullPaths[0] || "");
        } else {
          throw new Error(response.data.error || "Failed to fetch files");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

 

  const handleDropdownChange = (e) => {
    setSelectedFile(e.target.value);
  };

  const handleAnalyzeClick = async () => {
    if (!selectedFile) return;
  
    try {
      const response = await axios.post("http://localhost:5000/analyze", {
        file: selectedFile,
      });
  
      if (response.data.success) {
        setAnalysisResult(response.data.result || "Analysis completed successfully!");
        const logContent = response.data.content; // Get the content (log data)
        // Store the logContent in the context, instead of passing it as a prop
        const rowCount = logContent.split("\n").length; // Count rows (adjust based on your file structure)

        // Store log content and other counts in context
        setLogData(logContent)
        setRowCount(rowCount)
        setUploadedFileCount(files.length)
      } else {
        throw new Error(response.data.error || "Analysis failed.");
      }
    } catch (err) {
      setAnalysisResult(`Error: ${err.message}`);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <FaFile className="text-2xl text-blue-600" />
        <h3 className="text-lg font-medium">Log File Analysis</h3>
      </div>

      <label htmlFor="log-files" className="text-sm font-medium text-gray-700">
        Select Log File
      </label>

      <div className="relative">
        {loading ? (
          <p className="text-gray-500">Loading files...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <select
            id="log-files"
            value={selectedFile}
            onChange={handleDropdownChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          >
            {displayFiles.map((file, index) => (
              <option key={index} value={files[index]}>
                {file}
              </option>
            ))}
          </select>
        )}
        <FaArrowDown className="absolute right-3 top-3 text-gray-400" />
      </div>

      <div className="mt-4">
        <button
          type="button"
          onClick={handleAnalyzeClick}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={!selectedFile}
        >
          Analyze Log File
        </button>
      </div>

      {analysisResult && (
        <div className="mt-4 p-3 bg-gray-100 rounded-md border border-gray-300">
          <p className="text-sm font-medium text-gray-700">{analysisResult}</p>
        </div>
      )}
    </div>
  );
}

export default Analysislog;
