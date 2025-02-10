import React from "react";
import { useState } from "react";
import Sidebar from "@/components/bar/sidebar";
import Navbar from "@/components/bar/header";

const AccountList = () => {
    const [collapsed, setCollapsed] = useState(false);
          const toggleSidebar = () => setCollapsed(!collapsed);
  return (
    <div className="flex">
      <Sidebar collapsed={collapsed} onToggle={toggleSidebar} />
      <div className={`p-6 bg-gray-100 min-h-screen transition-all duration-300 flex-1 flex flex-col ${collapsed ? "ml-10" : "ml-52"}`}>
              <Navbar isSidebarCollapsed={collapsed} />
        <div className="p-6" style={{ marginTop: "40px" }}>
          {/* Account List Table */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Account List</h2>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md">+ Add New Account</button>
            </div>
            
            {/* Table Controls */}
            <div className="flex justify-between items-center mb-4">
              <div className="space-x-2">
                {['Copy', 'CSV', 'PDF', 'Print'].map((action) => (
                  <button key={action} className="bg-gray-200 px-3 py-1 rounded-md text-sm">{action}</button>
                ))}
              </div>
              <input type="text" placeholder="Search:" className="border p-2 rounded-md" />
            </div>

            {/* Table */}
            <table className="w-full border rounded-md">
              <thead>
                <tr className="bg-gray-100">
                  {['Account ID', 'Name', 'Opening Balance', 'Description', 'Action'].map((header) => (
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

            {/* Table Pagination */}
            <div className="flex justify-between items-center mt-4">
              <div>
                <label>Show </label>
                <select className="border p-1 rounded-md">
                  {[10, 25, 50, 100].map((num) => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
                <span> entries</span>
              </div>
              <div>
                <button className="bg-gray-200 px-3 py-1 rounded-md text-sm mr-2">Previous</button>
                <button className="bg-gray-200 px-3 py-1 rounded-md text-sm">Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountList;
