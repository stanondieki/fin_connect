import React from "react";
import { useState } from "react";
import { TrendingUp } from "lucide-react";
import Navbar from "@/components/bar/header";
import Sidebar from "@/components/bar/sidebar";

const UpcomingIncome = () => {
     const [collapsed, setCollapsed] = useState(false);
      const toggleSidebar = () => setCollapsed(!collapsed);
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar collapsed={collapsed} onToggle={toggleSidebar} />
      
      {/* Main Content */}
      <div className={`p-6 bg-gray-100 min-h-screen transition-all duration-300 flex-1 flex flex-col ${collapsed ? "ml-10" : "ml-52"}`}>
              {/* Navbar */}
              <Navbar isSidebarCollapsed={collapsed} />
        
        <div className="p-6" style={{ marginTop: "40px" }}>
          {/* Income Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {['Due this month', 'Due this week', 'Due today'].map((text, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg p-4 flex items-center relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 flex items-center justify-center w-16 bg-blue-500">
                  <TrendingUp className="text-white text-3xl" />
                </div>
                <div className="ml-20">
                  <p className="text-lg font-semibold">KSH0.00</p>
                  <p className="text-gray-600 text-sm">{text}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Upcoming Income Table */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
              <h2 className="text-lg font-semibold mb-2 md:mb-0">Upcoming Income</h2>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md">+ Add New Income</button>
            </div>
            
            {/* Table Controls */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-2 md:space-y-0">
              <div className="flex flex-wrap space-x-2">
                {['Copy', 'CSV', 'PDF', 'Print'].map((action) => (
                  <button key={action} className="bg-gray-200 px-3 py-1 rounded-md text-sm">{action}</button>
                ))}
              </div>
              <input type="text" placeholder="Search:" className="border p-2 rounded-md w-full md:w-auto" />
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full border rounded-md">
                <thead>
                  <tr className="bg-gray-100">
                    {['Name', 'Amount', 'Date', 'Category', 'Action'].map((header) => (
                      <th key={header} className="p-2 border text-left">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={5} className="text-center p-4">No data available in table</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Table Pagination */}
            <div className="flex flex-col md:flex-row justify-between items-center mt-4 space-y-2 md:space-y-0">
              <div className="flex items-center">
                <label className="mr-2">Show </label>
                <select className="border p-1 rounded-md">
                  {[10, 25, 50, 100].map((num) => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
                <span className="ml-2"> entries</span>
              </div>
              <div className="flex space-x-2">
                <button className="bg-gray-200 px-3 py-1 rounded-md text-sm">Previous</button>
                <button className="bg-gray-200 px-3 py-1 rounded-md text-sm">Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingIncome;