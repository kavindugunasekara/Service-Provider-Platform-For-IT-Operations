import React, { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { useLogData } from "./Logcontext";

function LogUsers() {
  const { logData } = useLogData(); // Access logData from context
  const [userCounts, setUserCounts] = useState({
    totalUsers: 0,
    unknownUsers: 0,
  });

  useEffect(() => {
    if (logData) {
      const { totalUsers, unknownUsers } = parseUserCounts(logData);
      setUserCounts({ totalUsers, unknownUsers });
    }
  }, [logData]);

  const parseUserCounts = (data) => {
    const logLines = data.split("\n").filter((line) => line.trim() !== "");
    let totalUsers = 0;
    let unknownUsers = 0;
  
    logLines.forEach((line) => {
      const userMatch = line.match(/- (\w+) \[/); // Extract username
  
      if (userMatch) {
        totalUsers++;
        const username = userMatch[1];
        if (username.toLowerCase() === "unknown") {
          unknownUsers++;
        }
      }
    });
  
    return { totalUsers, unknownUsers };
  };
  

  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
      <FaUserAlt className="text-4xl text-blue-600" />
      <h3 className="text-xl mt-2">Total Users</h3>
      <p className="text-2xl font-bold mt-2">{userCounts.totalUsers}</p>
      <p className="text-md text-gray-500">Unknown Users: {userCounts.unknownUsers}</p>
    </div>
  );
}

export default LogUsers;
