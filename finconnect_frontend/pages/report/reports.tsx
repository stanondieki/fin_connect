import { useState } from "react";
import Sidebar from "@/components/bar/sidebar";
import Navbar from "@/components/bar/header";

const Report = () => {
    const [collapsed, setCollapsed] = useState(false);
    const toggleSidebar = () => setCollapsed(!collapsed);

    return (
      <div className="flex">
        <Sidebar collapsed={collapsed} onToggle={toggleSidebar} />
        <div className={`p-6 bg-gray-100 min-h-screen transition-all duration-300 flex-1 flex flex-col ${collapsed ? "ml-10" : "ml-52"}`}>
          <Navbar isSidebarCollapsed={collapsed} />
          <div className="p-6" style={{ marginTop: '40px' }}>
            <div className="bg-white shadow-md rounded-lg p-6" style={{ minHeight: "400px" }}> {/* Increased height */}
              <h2 className="text-3xl font-semibold text-gray-800">All Reports</h2>
              <hr className="my-4 border-gray-300" /> {/* Horizontal line added */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 relative">
                {/* Left Column */}
                <div className="space-y-3">
                  <div className="border-b pb-2">
                    <a href="#" className="flex items-center text-gray-700 hover:text-blue-600">
                      <span className="mr-2">➡</span> Income Reports
                    </a>
                  </div>
                  <div className="border-b pb-2">
                    <a href="#" className="flex items-center text-gray-700 hover:text-blue-600">
                      <span className="mr-2">➡</span> Expense Reports
                    </a>
                  </div>
                  <div className="border-b pb-2">
                    <a href="#" className="flex items-center text-gray-700 hover:text-blue-600">
                      <span className="mr-2">➡</span> Income vs Expense Reports
                    </a>
                  </div>
                  <div>
                    <a href="#" className="flex items-center text-gray-700 hover:text-blue-600">
                      <span className="mr-2">➡</span> Upcoming Income
                    </a>
                  </div>
                </div>

                {/* Vertical Line */}
                <div className="absolute left-1/2 top-0 h-full w-[2px] bg-gray-300 hidden md:block"></div>

                {/* Right Column */}
                <div className="space-y-3">
                  <div className="border-b pb-2">
                    <a href="#" className="flex items-center text-gray-700 hover:text-blue-600">
                      <span className="mr-2">➡</span> Income Monthly Report
                    </a>
                  </div>
                  <div className="border-b pb-2">
                    <a href="#" className="flex items-center text-gray-700 hover:text-blue-600">
                      <span className="mr-2">➡</span> Expense Monthly Report
                    </a>
                  </div>
                  <div className="border-b pb-2">
                    <a href="#" className="flex items-center text-gray-700 hover:text-blue-600">
                      <span className="mr-2">➡</span> Account Transaction Reports
                    </a>
                  </div>
                  <div>
                    <a href="#" className="flex items-center text-gray-700 hover:text-blue-600">
                      <span className="mr-2">➡</span> Upcoming Expense
                    </a>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    );
};

export default Report;
