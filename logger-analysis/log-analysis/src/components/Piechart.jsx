import { useEffect, useState } from "react";
import { Bar, BarChart, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import IPRequestsScatter from "./Iprequests";
import { useLogData } from "./Logcontext";
import RequestsOverTime from "./Requestovertime";
import StatusTrendArea from "./StatusData";

function LogAnalysisChart() {
  const { logData } = useLogData(); // Access logData from context
  const [statusData, setStatusData] = useState([]);
  const [methodData, setMethodData] = useState([]);

  useEffect(() => {
    if (logData) {
      // Assuming logData is a raw text or JSON, handle accordingly:
      const parsedData = parseLogData(logData); // Parse logData if it's raw text

      // Count status codes
      const statusCounts = {};
      parsedData.forEach(({ status }) => {
        statusCounts[status] = (statusCounts[status] || 0) + 1;
      });

      // Count HTTP methods
      const methodCounts = {};
      parsedData.forEach(({ method }) => {
        methodCounts[method] = (methodCounts[method] || 0) + 1;
      });

      setStatusData(Object.keys(statusCounts).map((key) => ({ status: key, count: statusCounts[key] })));
      setMethodData(Object.keys(methodCounts).map((key) => ({ method: key, count: methodCounts[key] })));
    }
  }, [logData]);

  const parseLogData = (data) => {
    // If logData is raw text, you need to parse it
    const logLines = data.split("\n"); // Split by newlines if it's raw text

    // Parse each log line (assuming it's a JSON or structured format)
    return logLines.map((line) => {
      const [method, status] = extractMethodAndStatus(line);
      return { method, status };
    });
  };

  const extractMethodAndStatus = (line) => {
    const methodMatch = line.match(/"(GET|POST|PUT|DELETE|PATCH)/); // Match the HTTP method
    const statusMatch = line.match(/(\d{3})\s*$/); // Match only the last 3-digit number (status code)
  
    const method = methodMatch ? methodMatch[1] : "UNKNOWN";
    const status = statusMatch ? statusMatch[1] : "UNKNOWN";
  
    return [method, status];
  };
  
  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28DFF"];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Log Analysis</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Status Code Pie Chart */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-md font-semibold mb-2">Status Code Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={statusData} dataKey="count" nameKey="status" cx="50%" cy="50%" outerRadius={80} label>
                {statusData.map((_, index) => (
                  <Cell key={index} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* HTTP Methods Bar Chart */}
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-md font-semibold mb-2">HTTP Method Frequency</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={methodData}>
              <XAxis dataKey="method" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
        <RequestsOverTime/>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
        <IPRequestsScatter/>
        </div>
        
       
      </div>
      <div className="bg-gray-100 p-4 rounded-lg">
         
         <StatusTrendArea/>
          
         </div>
    </div>
  );
}

export default LogAnalysisChart;