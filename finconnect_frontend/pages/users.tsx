import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "@/components/bar/sidebar";
import Navbar from "@/components/bar/header";

const UsersReport = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [report, setReport] = useState({
    total_users: 0,
    active_users: 0,
    users_per_month: [],
  });

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const token = localStorage.getItem("token"); 
        const response = await axios.get("http://127.0.0.1:8000/api/reports/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReport(response.data);
      } catch (error) {
        console.error("Error fetching user reports:", error);
      }
    };

    fetchReport();
  }, []);

  const toggleSidebar = () => setCollapsed(!collapsed);

  return (
    <div className="flex">
      <Sidebar collapsed={collapsed} onToggle={toggleSidebar} />
      <div className={`p-6 bg-gray-100 min-h-screen transition-all duration-300 flex-1 flex flex-col ${collapsed ? "ml-10" : "ml-52"}`}>
        <Navbar isSidebarCollapsed={collapsed} />
        
        <div className="p-6" style={{ marginTop: "40px" }}>
          <div className="bg-white shadow-md rounded-lg p-6 min-h-[400px]">
            <h2 className="text-3xl font-semibold text-gray-800">User Reports</h2>
            <hr className="my-4 border-gray-300" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              {/* Left Column */}
              <div className="space-y-3">
                <div className="border-b pb-2">
                  <span className="text-gray-700 font-semibold">Total Users:</span>
                  <span className="ml-2 text-blue-600">{report.total_users}</span>
                </div>
                <div className="border-b pb-2">
                  <span className="text-gray-700 font-semibold">Active Users:</span>
                  <span className="ml-2 text-green-600">{report.active_users}</span>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-gray-700">Users Registered Per Month</h3>
                <ul className="list-disc ml-5">
                  {report.users_per_month.map((monthData: any, index) => (
                    <li key={index} className="text-gray-700">
                      <span className="font-semibold">Month {monthData.month}:</span> {monthData.total} users
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersReport;
