import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Button from "@/components/ui/Button";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { User, DollarSign, BarChart2, Bell, CheckCircle, Lightbulb, TrendingUp } from "lucide-react";
import Progress from "@/components/progress/progress";
import Sidebar from "../../components/bar/sidebar";
import Navbar from "@/components/bar/header";

const Dashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => setCollapsed(!collapsed);

  const sampleData = [
    { month: "Jan", expenses: 400, income: 800 },
    { month: "Feb", expenses: 300, income: 900 },
    { month: "Mar", expenses: 500, income: 750 },
    { month: "Apr", expenses: 700, income: 1100 },
    { month: "May", expenses: 600, income: 850 },
    { month: "Jun", expenses: 450, income: 950 },
    { month: "Jul", expenses: 700, income: 1000 },
    { month: "Aug", expenses: 500, income: 900 },
    { month: "Sep", expenses: 650, income: 1050 },
    { month: "Oct", expenses: 800, income: 1200 },
    { month: "Nov", expenses: 550, income: 950 },
    { month: "Dec", expenses: 750, income: 1150 },
  ];

  return (
    <div className="flex">
      <Sidebar collapsed={collapsed} onToggle={toggleSidebar} />
      <div className={`p-6 bg-gray-100 min-h-screen transition-all duration-300 flex-1 flex flex-col ${collapsed ? "ml-10" : "ml-56"}`}>
      <Navbar isSidebarCollapsed={collapsed} />

        <h1 className="text-3xl font-bold text-blue-600 mb-6"
        style={{ marginTop:'40px' }}>Dashboard</h1>

        {/* Overview Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent>
              <div className="flex items-center space-x-4">
                <User className="text-blue-500 w-10 h-10" />
                <div>
                  <h2 className="text-lg font-semibold text-blue-600">Profile Overview</h2>
                  <p className="text-neutral-800">Anthony Makori</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <div className="flex items-center space-x-4">
                <DollarSign className="text-green-500 w-10 h-10" />
                <div>
                  <h2 className="text-lg font-semibold text-green-500">Monthly Budget</h2>
                  <p className="text-gray-600">$2,500</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <div className="flex items-center space-x-4">
                <BarChart2 className="text-purple-500 w-10 h-10" />
                <div>
                  <h2 className="text-lg font-semibold text-purple-500">Savings Progress</h2>
                  <p className="text-gray-600">$8,750</p>
                  <Progress value={70} className="mt-2 w-full" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notifications Section */}
        <div className="bg-white p-4 rounded-2xl shadow-lg mb-6">
          <h2 className="text-lg font-bold mb-2 text-blue-600 flex items-center">
            <Bell className="mr-2" /> Notifications
          </h2>
          <ul className="space-y-2">
            <li className="flex items-center space-x-3 bg-green-50 hover:bg-gray-100 rounded-md p-2">
              <CheckCircle className="text-green-500 w-5 h-5" />
              <p className="text-gray-700 text-sm">🚀 You achieved a 7-day savings streak!</p>
            </li>
          </ul>
        </div>

        {/* Graph Section */}
        <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
          <h2 className="text-xl font-bold mb-4 text-black">
            <span className="text-red-500">Expense</span> vs. <span className="text-green-500">Income Analysis</span>
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={sampleData}>
              <Line type="monotone" dataKey="expenses" stroke="#FF5733" strokeWidth={2} />
              <Line type="monotone" dataKey="income" stroke="#33FF57" strokeWidth={2} />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
