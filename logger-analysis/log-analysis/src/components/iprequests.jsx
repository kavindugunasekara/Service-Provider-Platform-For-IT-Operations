import React, { useEffect, useState } from "react";
import { ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis } from "recharts";
import { useLogData } from "./Logcontext"; // Import the context

// Function to parse log entries into structured data
const parseLogData = (logText) => {
  if (!logText || typeof logText !== "string") {
    console.error("Expected log text but got:", logText);
    return [];
  }

  return logText
    .trim()
    .split("\n")
    .map((log) => {
      const regex = /(\S+) - (\S+) \[(.*?)\] "(.*?) (.*?)" (\d+)/;
      const match = log.match(regex);
      
      if (match) {
        const [_, ip, user, timestamp, method, path, status] = match;
        return {
          ip,
          user,
          method,
          path,
          status: parseInt(status, 10),
          timestamp,
        };
      }
      return null;
    })
    .filter(item => item !== null);
};

// Function to calculate the count of each IP
const getIPCounts = (data) => {
  const ipCountMap = {};

  data.forEach((log) => {
    ipCountMap[log.ip] = (ipCountMap[log.ip] || 0) + 1;
  });

  return Object.keys(ipCountMap).map(ip => ({
    ip,
    status: data.find(log => log.ip === ip).status, // Status of the first occurrence of the IP
    count: ipCountMap[ip],
  }));
};

function IPRequestsScatter() {
  const [startDate, setStartDate] = useState("2025-03-29T14:30:00Z");
  const [endDate, setEndDate] = useState("2025-03-29T14:50:00Z");
  const [statusFilter, setStatusFilter] = useState("");

  const { logData } = useLogData(); // Access logData from context

  // Function to filter data by date range and status code
  const filterData = (data) => {
    return data.filter((log) => {
      const logTimestamp = new Date(log.timestamp).getTime();
      const start = new Date(startDate).getTime();
      const end = new Date(endDate).getTime();
      const statusMatches = statusFilter ? log.status === parseInt(statusFilter) : true;
      return logTimestamp >= start && logTimestamp <= end && statusMatches;
    });
  };

  // Use useEffect to trigger data filtering and processing when the filters change
  const [filteredData, setFilteredData] = useState([]); // Initialize as empty array
  useEffect(() => {
    if (logData && typeof logData === "string") {
      const parsedData = parseLogData(logData);
      const updatedData = filterData(parsedData);
      setFilteredData(updatedData);
    } else {
      console.error("logData is not a string:", logData);
    }
  }, [logData, startDate, endDate, statusFilter]);

  const processedData = getIPCounts(filteredData);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-md font-semibold mb-2">IP Requests vs. Status Code</h3>

      <div className="mb-4">
        <label htmlFor="start-date" className="mr-2">Start Date:</label>
        <input
          id="start-date"
          type="datetime-local"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="end-date" className="mr-2">End Date:</label>
        <input
          id="end-date"
          type="datetime-local"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="status-filter" className="mr-2">Status Code:</label>
        <select
          id="status-filter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="200">200 OK</option>
          <option value="301">301 Moved Permanently</option>
          <option value="302">302 Found</option>
          <option value="404">404 Not Found</option>
          <option value="500">500 Internal Server Error</option>
          <option value="403">403 Forbidden</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart>
          <XAxis dataKey="ip" type="category" />
          <YAxis dataKey="status" type="number" />
          <ZAxis dataKey="count" range={[100, 400]} />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Scatter name="Requests" data={processedData} fill="#FF8042" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}

export default IPRequestsScatter;
