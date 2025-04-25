import axios from "axios";
import { useEffect, useState } from "react";
import { FaArrowDown, FaFile } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function Viewlogdata() {
  const [files, setFiles] = useState([]);
  const [displayFiles, setDisplayFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [analysisResult, setAnalysisResult] = useState([]); // FIX: was string

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

  const handleTable = async () => {
    try {
      const response = await axios.post("http://localhost:5000/analyze", {
        file: selectedFile,
      });

      if (response.data.success) {
        const rawContent = response.data.content;
      
        const parsedLogData = rawContent.split("\n").map((entry) => {
          const regex = /(\S+) - (\S+) \[(.*?)\] "(.*?)" (\d{3})/;
          const match = entry.match(regex);
      
          if (match) {
            const [, ip, user, timestamp, request, status] = match;
            return {
              ip,
              user,
              timestamp,
              method: request.split(" ")[0],
              path: request.split(" ")[1],
              status: parseInt(status, 10),
            };
          }
          return null;
        }).filter(Boolean); // Removes nulls
      
        setAnalysisResult(parsedLogData); // ✅ Corrected line
      } else {
        throw new Error(response.data.error || "Analysis failed.");
      }
  
    } catch (err) {
      setAnalysisResult([]);
      setError(`Error: ${err.message}`);
    }
  };

  return (
    <div className="flex-grow p-6 sm:p-8 ml-5 sm:ml-16 lg:ml-66">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <FaFile className="text-2xl text-blue-600" />
            <h3 className="text-lg font-medium">Select Log File </h3>
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
              onClick={handleTable}
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={!selectedFile}
            >
              View on Table
            </button>
          </div>
        </div>

        {Array.isArray(analysisResult) && analysisResult.length > 0 && (
          <div className="mt-6 max-h-[500px] overflow-auto border rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 border border-gray-300 shadow-sm rounded-lg">
              <thead className="bg-blue-50">
                <tr>
                  {Object.keys(analysisResult[0]).map((key) => (
                    <th
                      key={key}
                      className="px-4 py-2 text-left text-sm font-semibold text-gray-800 uppercase"
                    >
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {analysisResult.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    {Object.values(row).map((value, idx) => (
                      <td
                        key={idx}
                        className="px-4 py-2 text-sm text-gray-700 max-w-xs overflow-hidden text-ellipsis whitespace-nowrap"
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
