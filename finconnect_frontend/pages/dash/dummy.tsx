import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Button from "@/components/ui/Button";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { User, DollarSign, BarChart2, ArrowLeft } from "lucide-react";
import { useRouter } from "next/router";

const Dashboard: React.FC = () => {
  const router = useRouter();

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
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">Dashboard</h1>
        <button
          onClick={() => router.back()}
          className="flex items-center space-x-2 text-blue-500 border border-blue-600 rounded-lg px-4 py-2 hover:bg-blue-50"
          aria-label="Go Back"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
      </div>

      {/* Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {[
          {
            icon: <User className="text-blue-500 w-10 h-10" />,
            title: "Profile Overview",
            detail: "Anthony Makori",
          },
          {
            icon: <DollarSign className="text-green-500 w-10 h-10" />,
            title: "Monthly Budget",
            detail: "$2,500",
          },
          {
            icon: <BarChart2 className="text-purple-500 w-10 h-10" />,
            title: "Savings Progress",
            detail: "$8,750",
          },
        ].map((item, index) => (
          <Card key={index}>
            <CardContent>
              <div className="flex items-center space-x-4">
                {item.icon}
                <div>
                  <h2 className="text-lg font-semibold text-blue-600">{item.title}</h2>
                  <p className="text-neutral-800">{item.detail}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Graph Section */}
      <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
        <h2 className="text-xl font-bold mb-4">Expense vs. Income Analysis</h2>
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

      {/* Call to Action Section */}
      <div className="mt-6">
        <Card>
          <CardContent className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div>
              <h2 className="text-lg font-semibold">Ready to improve your finances?</h2>
              <p className="text-gray-600">Get personalized advice and actionable insights.</p>
            </div>
            <Button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Get Started</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
