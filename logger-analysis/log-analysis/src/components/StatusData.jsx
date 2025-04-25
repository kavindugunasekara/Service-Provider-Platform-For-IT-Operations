import React, { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useLogData } from "./Logcontext";

// Function to parse log data from plain text
function parseLogData(rawData) {
  return rawData.split("\n").map((entry) => {
    // Extract timestamp and status from log entry
    const regex = /(\S+) - (\S+) \[(.*?)\] "(.*?)" (\d{3})/;
    const match = entry.match(regex);
    
    if (match) {
      const [, ip, user, timestamp, request, status] = match;
      return { ip, user, timestamp, method: request.split(" ")[0], path: request.split(" ")[1], status: parseInt(status, 10) };
    }
    return null; // Return null if the log entry doesn't match
  }).filter(Boolean); // Remove null entries
}

// Function to process status data into success/failure trend
function processStatusData(data) {
  const statusTrend = {};

  data.forEach((entry) => {
    const time = entry.timestamp.slice(11, 16); // Extracts the time (HH:MM)
    const success = entry.status >= 200 && entry.status < 400 ? 1 : 0;
    const failed = entry.status >= 400 ? 1 : 0;

    if (statusTrend[time]) {
      statusTrend[time].success += success;
      statusTrend[time].failed += failed;
    } else {
      statusTrend[time] = { success, failed };
    }
  });

  // Convert the object to an array for recharts
  return Object.entries(statusTrend).map(([time, { success, failed }]) => ({
    time,
    success,
    failed,
  }));
}

function StatusTrendArea() {
  const { logData } = useLogData(); // Access logData from context
  const [startDate, setStartDate] = useState("2025-03-29T14:30:00Z");
  const [endDate, setEndDate] = useState("2025-03-29T14:50:00Z");
  const [statusData, setStatusData] = useState([]);

  useEffect(() => {
    if (logData) {
      // Parse the raw logData (plain text) into structured data
      const parsedLogData = parseLogData(logData);

      // Function to filter the data by date range
      const filterDataByDateRange = (data) => {
        const start = new Date(startDate).getTime();
        const end = new Date(endDate).getTime();

        return data.filter((entry) => {
          const logTimestamp = new Date(entry.timestamp).getTime();
          return logTimestamp >= start && logTimestamp <= end;
        });
      };

      // Filter the data by date range and process it for the chart
      const filteredData = filterDataByDateRange(parsedLogData);
      setStatusData(processStatusData(filteredData));
    }
  }, [logData, startDate, endDate]); // Depend on logData, startDate, and endDate for dynamic updates

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-md font-semibold mb-2">Success vs. Failure Requests</h3>

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

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={statusData}>
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <CartesianGrid strokeDasharray="3 3" />
          <Area type="monotone" dataKey="success" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
          <Area type="monotone" dataKey="failed" stackId="1" stroke="#FF0000" fill="#FF0000" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default StatusTrendArea;
