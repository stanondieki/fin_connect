import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Button from "@/components/ui/Button";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { User, DollarSign, BarChart2, TrendingUp, ShieldAlert } from "lucide-react";
import Progress from "@/components/progress/progress";
import Sidebar from "../../components/bar/sidebar";
import Navbar from "@/components/bar/header";
import Chatbot from "@/components/bot/chatbot";

const Dashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleSidebar = () => setCollapsed(!collapsed);

  const sampleData = [
    { month: "Jan", expenses: 60000, income: 80000 },
    { month: "Feb", expenses: 75000, income: 90000 },
    { month: "Mar", expenses: 50000, income: 75000 },
    { month: "Apr", expenses: 70000, income: 110000 },
    { month: "May", expenses: 60000, income: 85000 },
    { month: "Jun", expenses: 95000, income: 150000 },
    { month: "Jul", expenses: 70000, income: 150000 },
    { month: "Aug", expenses: 75000, income: 150000 },
    { month: "Sep", expenses: 100000, income: 120000 },
    { month: "Oct", expenses: 85000, income: 135000 },
    { month: "Nov", expenses: 90000, income: 145000 },
    { month: "Dec", expenses: 95000, income: 155000 },
  ];

  return (
    <div className="flex">
      <Sidebar collapsed={collapsed} onToggle={toggleSidebar} />
      <div className={`p-6 bg-gray-100 min-h-screen transition-all duration-300 flex-1 flex flex-col ${collapsed ? "ml-10" : "ml-56"}`}>
        <Navbar isSidebarCollapsed={collapsed} />
        
        <h1 className="text-3xl font-bold text-blue-600 mb-6 mt-10">Dashboard</h1>
        
        {/* Financial Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="flex items-center space-x-4">
              <User className="text-blue-500 w-10 h-10" />
              <div>
                <h2 className="text-lg font-semibold text-blue-600">Net Worth</h2>
                <p className="text-gray-600">$12,000</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center space-x-4">
              <DollarSign className="text-green-500 w-10 h-10" />
              <div>
                <h2 className="text-lg font-semibold text-green-500">Savings Progress</h2>
                <p className="text-gray-600">$8,750</p>
                <Progress value={70} className="mt-2 w-full" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center space-x-4">
              <BarChart2 className="text-purple-500 w-10 h-10" />
              <div>
                <h2 className="text-lg font-semibold text-purple-500">Investment Portfolio</h2>
                <p className="text-gray-600">$15,500</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Insights & Risk Alerts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardContent>
              <h2 className="text-lg font-bold text-green-500 flex items-center mb-2">
                <TrendingUp className="mr-2" /> AI Investment Insights
              </h2>
              <p className="text-gray-600">📈 Increase your investment in tech stocks by 10% based on market trends.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent>
              <h2 className="text-lg font-bold text-red-500 flex items-center mb-2">
                <ShieldAlert className="mr-2" /> Security & Fraud Alerts
              </h2>
              <p className="text-gray-600">⚠️ A suspicious transaction was detected in your account. Verify now.</p>
            </CardContent>
          </Card>
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

        {/* AI Chatbot */}
        <div className="bg-white p-4 rounded-2xl shadow-lg mb-6">
          <h2 className="text-lg font-bold text-blue-600">💬 Ask AI Financial Advisor</h2>
          <Chatbot />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;