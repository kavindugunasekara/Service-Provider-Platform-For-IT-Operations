import { createContext, useContext, useEffect, useState } from "react";

// Create context
const LogContext = createContext();

// Create provider component
export const LogProvider = ({ children }) => {
  // Helper to get from localStorage or fallback
  const getLocal = (key, fallback) => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  };

  // Initialize state from localStorage
  const [logData, setLogData] = useState(getLocal("logData", null));
  const [AiData, setAiData] = useState(getLocal("AiData", null));
  const [rowCount, setRowCount] = useState(getLocal("rowCount", 0));
  const [uploadedFileCount, setUploadedFileCount] = useState(getLocal("uploadedFileCount", 0));

  // Persist to localStorage whenever these values change
  useEffect(() => {
    localStorage.setItem("logData", JSON.stringify(logData));
  }, [logData]);

  useEffect(() => {
    localStorage.setItem("rowCount", JSON.stringify(rowCount));
  }, [rowCount]);

  useEffect(() => {
    localStorage.setItem("uploadedFileCount", JSON.stringify(uploadedFileCount));
  }, [uploadedFileCount]);


  useEffect(() => {
    localStorage.setItem("AiData", JSON.stringify(AiData));
  }, [AiData]);

  return (
    <LogContext.Provider
      value={{
        logData,
        setLogData,
        rowCount,
        setRowCount,
        uploadedFileCount,
        setUploadedFileCount,
        AiData,
        setAiData
      }}
    >
      {children}
    </LogContext.Provider>
  );
};

// Custom hook
export const useLogData = () => useContext(LogContext);
