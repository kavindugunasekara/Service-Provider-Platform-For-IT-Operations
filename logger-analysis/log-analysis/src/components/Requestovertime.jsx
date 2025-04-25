import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useLogData } from "./Logcontext";

// Function to process data into request timeline with request counts per time
function processRequestData(data) {
  const timeCount = data.reduce((acc, entry) => {
    const time = entry.timestamp.slice(0, 16); // Extracts time (HH:MM)
    acc[time] = (acc[time] || 0) + 1; // Increment count for this time
    return acc;
  }, {});

  // Convert to an array of objects with time and request count
  return Object.keys(timeCount).map(time => ({
    time,
    requests: timeCount[time],
  }));
}

function RequestsOverTime() {
  const { logData } = useLogData(); // Access logData from context
  const [requestTimeline, setRequestTimeline] = useState([]);
  const [filterStatus, setFilterStatus] = useState(""); // To hold filter value for status
  const [startDate, setStartDate] = useState(null); // To hold start date
  const [endDate, setEndDate] = useState(null); // To hold end date

  useEffect(() => {
    if (logData) {
      // Parse logData and filter based on status and date range
      const parsedLogData = logData.split("\n").map((entry) => {
        const regex = /(\S+) - (\S+) \[(.*?)\] "(.*?)" (\d{3})/;
        const match = entry.match(regex);
        
        if (match) {
          const [, ip, user, timestamp, request, status] = match;
          return { ip, user, timestamp, method: request.split(" ")[0], path: request.split(" ")[1], status: parseInt(status, 10) };
        }
        return null; // Return null if the log entry doesn't match
      }).filter(Boolean); // Remove null entries

      // Filter data based on status and date range if set
      let filteredData = parsedLogData;

      if (filterStatus) {
        filteredData = filteredData.filter(entry => entry.status === parseInt(filterStatus));
      }

      if (startDate && endDate) {
        filteredData = filteredData.filter(entry => {
          const timestamp = new Date(entry.timestamp);
          return timestamp >= startDate && timestamp <= endDate;
        });
      }

      setRequestTimeline(processRequestData(filteredData)); // Set filtered request timeline on mount
    }
  }, [logData, filterStatus, startDate, endDate]); // Depend on logData, filterStatus, startDate, and endDate

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-md font-semibold mb-2">Requests Over Time</h3>

      {/* Filter Section */}
      <div className="mb-4">
        <label className="mr-2">Filter by Status Code:</label>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All</option>
          <option value="200">200 OK</option>
          <option value="401">401 Unauthorized</option>
          <option value="403">403 Forbidden</option>
          <option value="404">404 Not Found</option>
          <option value="500">500 Internal Server Error</option>
          <option value="429">429 Too Many Requests</option>
        </select>
      </div>

      {/* Date Range Picker */}
      <div className="mb-4">
        <label className="mr-2">Filter by Date Range:</label>
        <div className="flex space-x-2">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            className="border p-2 rounded"
            placeholderText="Start Date"
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            className="border p-2 rounded"
            placeholderText="End Date"
          />
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={requestTimeline}>
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <CartesianGrid strokeDasharray="3 3" />
          <Line type="monotone" dataKey="requests" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default RequestsOverTime;
